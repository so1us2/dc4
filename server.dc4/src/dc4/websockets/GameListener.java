package dc4.websockets;

import java.util.UUID;

import dc4.service.GameService;
import ox.Json;

public class GameListener extends WebSocketListener {

  private static final GameListener instance = new GameListener();

  private final GameService gameService = GameService.get();

  private GameListener() {
    super("game");
    command(testRequest);
    command(reconnectRequest);
  }

  public static GameListener get() {
    return instance;
  }

  private Command testRequest = new Command(
      "testRequest",
      message -> isValidGameMessageStructure(message) && message.data.has("a"),
      message -> gameService.handleTestRequest(new GameMessage(message)));

  private Command reconnectRequest = new Command(
      "reconnect",
      this::isValidGameMessageStructure,
      gameService::handleReconnectRequest
      );

  private boolean isValidGameMessageStructure(WebSocketMessage message) {
    return message.data.hasKey("gameUUID") && message.data.hasKey("playerUUID");
  }

  public class GameMessage {
    public String command;
    public UUID gameUUID;
    public UUID playerUUID;
    public Json data;

    public GameMessage(WebSocketMessage message) {
      this.command = message.command;
      this.gameUUID = UUID.fromString(message.data.get("gameUUID"));
      this.playerUUID = UUID.fromString(message.data.get("playerUUID"));
      this.data = message.data.remove("gameUUID").remove("playerUUID");
    }

    @Override
    public String toString() {
      return toJson().toString();
    }

    public Json toJson() {
      return Json.object().with("command", command).with("gameUUID", gameUUID).with("playerUUID", playerUUID)
          .with("data", data);
    }
  }
}
