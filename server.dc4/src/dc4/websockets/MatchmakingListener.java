package dc4.websockets;

import java.util.UUID;

import dc4.service.MatchmakingService;

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
      message -> message.data.has("name") && !message.data.get("name").isBlank(),
      message -> {
        matchmakingService.startSearch(message.data.get("name"), message.socket);
      });

  Command cancelSearch = new Command("cancelSearch",
      message -> message.data.has("token"),
      message -> {
        matchmakingService.stopSearch(UUID.fromString(message.data.get("token")), message.socket);
      });

}
