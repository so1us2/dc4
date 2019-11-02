package backend.websockets;

import java.util.UUID;

import backend.service.MatchmakingService;

public class MatchmakingListener extends WebSocketListener {

  private static final MatchmakingListener instance = new MatchmakingListener();

  private final MatchmakingService matchmakingService = MatchmakingService.get();

  public static MatchmakingListener get() {
    return instance;
  }

  private MatchmakingListener() {
    super("matchmaking");
    command(search);
    command(cancelSearch);
  }

  Command search = new Command("search", 
      data -> data.has("name") && !data.get("name").isBlank(),
      (data, socket) -> {
        matchmakingService.startSearch(data.get("name"), socket);
      });

  Command cancelSearch = new Command("cancelSearch",
      data -> data.has("token"),
      (data, socket) -> {
        matchmakingService.stopSearch(UUID.fromString(data.get("token")), socket);
      });

}
