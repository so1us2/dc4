package backend.service;

import java.util.UUID;

import backend.websockets.TransactionListener.WebSocketTransaction;
import bowser.websocket.ClientSocket;
import ox.Json;

public class ConnectionService {

  private static final ConnectionService instance = new ConnectionService();

  private static final int VERIFY_CONNECTION_TIMEOUT = 2000; // 2 seconds to verify connection.

  public static ConnectionService get() {
    return instance;
  }

  public boolean verifyConnection(ClientSocket socket) {
    UUID uuid = UUID.randomUUID();
    return new WebSocketTransaction<Boolean>(socket)
        .message(Json.object()
            .with("channel", "connection")
            .with("command", "verify")
            .with("data", Json.object().with("token", uuid)))
        .setTimeoutMillis(VERIFY_CONNECTION_TIMEOUT)
        .onFail(() -> false)
        .onResponse((json) -> {
          return true; // TODO: This should actually check the UUID in the payload.
        })
        .execute()
        .getResult();
  }

}
