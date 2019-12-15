package dc4.service;

import java.util.Deque;
import java.util.Map;
import java.util.UUID;

import com.google.common.collect.Maps;
import com.google.common.collect.Queues;

import dc4.arch.HumanPlayer;
import dc4.websockets.DC4ClientSocket;
import dc4.websockets.WebSocketMessage;
import dc4.websockets.transaction.BiTransaction;
import dc4.websockets.transaction.Transaction;
import ox.Json;
import ox.Log;
import ox.Threads;

public class MatchmakingService {

  private final GameService gameService = GameService.get();

  private final ConnectionService connectionService = ConnectionService.get();

  private static final MatchmakingService instance = new MatchmakingService();
  static {
    instance.start();
  }

  // How long players have to accept a found match.
  private static final long ACCEPT_TIME_MILLIS = 11_000;

  private Deque<HumanPlayer> searchingPlayers = Queues
      .<HumanPlayer>synchronizedDeque(Queues.<HumanPlayer>newArrayDeque());
  private Map<UUID, HumanPlayer> uuidToPlayer = Maps.newConcurrentMap();

  private MatchmakingService() {
    // Singleton pattern.
  }

  public static MatchmakingService get() {
    return instance;
  }

  public void start() {
    Threads.run(this::makeMatches);
  }

  public void makeMatches() {
    while (true) {
      HumanPlayer player1, player2;

      if (searchingPlayers.size() >= 2) {
        player1 = searchingPlayers.remove();
        player2 = searchingPlayers.remove();
      } else {
        Thread.yield();
        continue;
      }

      Log.debug("Matchmaking service found a match.  Players: %s and %s.", player1.name, player2.name);

      new BiTransaction<Boolean, Boolean, Void>(accept(player1), accept(player2))
          .waitAll()
          .onComplete((r1, r2) -> {
            Log.debug("onComplete called with %s, %s", r1, r2);
            if (r1 && r2) {
              gameService.startGame(player1, player2);
            } else if (r1 && !r2) {
              returnToQueue(player1);
            } else if (!r1 && r2) {
              returnToQueue(player2);
            }
            return null;
          })
          .execute();
    }
  }

  public void startSearch(String name, DC4ClientSocket socket) {
    HumanPlayer player = new HumanPlayer(name, socket);
    player.uuid = UUID.randomUUID();
    uuidToPlayer.put(player.uuid, player);
    searchingPlayers.add(player);
    socket.send(new WebSocketMessage("search", "token", Json.object().with("token", player.uuid.toString())));
  }

  public void stopSearch(UUID uuid, DC4ClientSocket socket) {
    if (!uuidToPlayer.containsKey(uuid)) {
      socket.send(WebSocketMessage.plainMessage("Could not find token " + uuid));
      return;
    }
    HumanPlayer player = uuidToPlayer.get(uuid);
    uuidToPlayer.remove(uuid);

    synchronized (searchingPlayers) {
      searchingPlayers.remove(player);
    }

    socket.send(WebSocketMessage.plainMessage("Removed player " + player.name + " from search queue."));
  }

  private void returnToQueue(HumanPlayer player) {
    searchingPlayers.addFirst(player);
    player.socket.send(new WebSocketMessage("matchmaking", "opponentDidNotAccept"));
  }

  private Transaction<Boolean> accept(HumanPlayer player) {
    return new Transaction<Boolean>(player.socket)
        .message(new WebSocketMessage("matchmaking", "accept"))
        .setTimeoutMillis(ACCEPT_TIME_MILLIS)
        .onResponse(json -> {
          if (!json.hasKey("response")) {
            return false;
          } else if (json.get("response").equalsIgnoreCase("accept")) {
            return true;
          } else {
            return false;
          }
        })
        .onFail(() -> false);
  }

}
