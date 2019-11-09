package dc4.service;

import dc4.websockets.DC4ClientSocket;
import dc4.websockets.WebSocketMessage;
import dc4.websockets.transaction.Transaction;
import ox.Json;

public class ConnectionService {

  private static final ConnectionService instance = new ConnectionService();

  private static final int VERIFY_CONNECTION_TIMEOUT = 2000; // 2 seconds to verify connection.

  public static ConnectionService get() {
    return instance;
  }

  public boolean verifyConnection(DC4ClientSocket socket) {
    return new Transaction<Boolean>(socket)
        .message(new WebSocketMessage("connection", "verify", Json.object())) // no data,.
        .setTimeoutMillis(VERIFY_CONNECTION_TIMEOUT)
        .onFail(() -> false)
        .onResponse(anyResponse -> true)
        .execute()
        .getResult();
  }

}
