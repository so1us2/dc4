package backend.service;

import java.util.ArrayDeque;
import java.util.Map;
import java.util.UUID;

import com.google.common.collect.Maps;
import com.google.common.collect.Queues;

import backend.arch.HumanPlayer;
import bowser.websocket.ClientSocket;
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

  private ArrayDeque<HumanPlayer> searchingPlayers = Queues.newArrayDeque();
  private Map<UUID, HumanPlayer> uuidToPlayer = Maps.newHashMap();

  private MatchmakingService() {

  }

  public static MatchmakingService get() {
    return instance;
  }

  public void start() {
    Threads.run(this::makeMatches);
  }

  public void makeMatches() {
    for (long i = 0; i < 100_000_000_000L; i++) {
      if (i % 1_000_000_000 == 0) {
        Log.debug("searchingPlayers.size() is %d", searchingPlayers.size());
      }
      HumanPlayer player1, player2;

      synchronized (searchingPlayers) {
        if (searchingPlayers.size() >= 2) {
          player1 = searchingPlayers.remove();
          player2 = searchingPlayers.remove();
        } else {
          Thread.yield();
          continue;
        }
      }

      Log.debug("Matchmaking service found a match.  Players: %s and %s.", player1.name, player2.name);
      if (!connectionService.verifyConnection(player1.socket)) {
        synchronized (searchingPlayers) {
          searchingPlayers.addFirst(player2);
        }
        continue;
      } else if (!connectionService.verifyConnection(player2.socket)) {
        synchronized (searchingPlayers) {
          searchingPlayers.addFirst(player1);
        }
        continue;
      }
      sendMatchFound(player1);
      sendMatchFound(player2);
      gameService.startGame(player1, player2);

    }
  }

  public void startSearch(String name, ClientSocket socket) {
    HumanPlayer player = new HumanPlayer(name, socket);
    player.uuid = UUID.randomUUID();
    uuidToPlayer.put(player.uuid, player);
    searchingPlayers.add(new HumanPlayer(name, socket));
    socket.send(Json.object()
        .with("channel", "search")
        .with("command", "token")
        .with("data", Json.object()
            .with("token", player.uuid.toString())));
  }

  public void stopSearch(UUID uuid, ClientSocket socket) {
    if (!uuidToPlayer.containsKey(uuid)) {
      socket.send(Json.object().with("message", "Could not find token " + uuid));
      return;
    }
    HumanPlayer player = uuidToPlayer.get(uuid);
    uuidToPlayer.remove(uuid);
    searchingPlayers.remove(player);
    socket.send(Json.object().with("message", "Removed player " + player.name + " from search queue."));
  }

  private void sendMatchFound(HumanPlayer player) {
    player.socket.send(Json.object().with("channel", "matchmaking").with("command", "matchFound"));
  }

}
