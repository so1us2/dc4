package backend.websockets;

import java.util.UUID;

import backend.service.ConnectionService;
import bowser.websocket.ClientSocket;
import ox.Json;

public class ConnectionListener extends WebSocketListener {

  private static final ConnectionListener instance = new ConnectionListener();

  private final ConnectionService connectionService = ConnectionService.get();

  public static ConnectionListener get() {
    return instance;
  }

  private ConnectionListener() {
    super("connection");
  }

  @Override
  protected void handle(String command, Json data, ClientSocket socket) {
    if (!command.contentEquals("verify")) {
      socket.send(Json.object().with("message", "Connection listener only accepts verify command."));
      return;
    }
    if (!data.has("token")) {
      socket.send(Json.object().with("message", "Verify command requires a token."));
      return;
    }
    UUID token = UUID.fromString(data.get("token"));
    connectionService.handleVerification(token);
  }

}
