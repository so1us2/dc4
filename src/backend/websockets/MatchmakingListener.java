package backend.websockets;

import java.util.Map;
import java.util.UUID;

import com.google.common.collect.Maps;

import backend.arch.HumanPlayer;
import backend.service.MatchmakingService;
import bowser.websocket.ClientSocket;
import ox.Json;
import ox.Log;

public class MatchmakingListener extends WebSocketListener {

  private static final MatchmakingListener instance = new MatchmakingListener();

  private final MatchmakingService matchmakingService = MatchmakingService.get();

  private final Map<UUID, HumanPlayer> searchingPlayers = Maps.newHashMap();

  public static MatchmakingListener get() {
    return instance;
  }

  private MatchmakingListener() {
    super("matchmaking");
  }

  @Override
  protected void handle(String command, Json data, ClientSocket socket) {
    Log.info("Matchmaking listener received command %s and data:", command);
    if (command.contentEquals("search")) {
      matchmakingService.startSearch(data.get("name"), socket);
    } else if (command.contentEquals("cancelSearch")) {
      matchmakingService.stopSearch(socket);
    }
  }


}
