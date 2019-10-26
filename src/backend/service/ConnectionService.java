package backend.service;

import java.util.Map;
import java.util.UUID;

import com.google.common.collect.Maps;

import backend.websockets.WebSocketTransaction;
import bowser.websocket.ClientSocket;
import ox.Json;
import ox.Log;

public class ConnectionService {

  private static final ConnectionService instance = new ConnectionService();

  private static final int VERIFY_CONNECTION_TIMEOUT = 2000; // 2 seconds to verify connection.

  private final Map<UUID, ConnectionCheck> connectionChecks = Maps.newHashMap();

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
        .setTimeoutMillis(2000)
        .onFail(() -> false)
        .onResponse((json) -> {
          return true; // TODO: This should actually check the UUID in the payload.
        })
        .execute()
        .getResult();
  }

  public void handleVerification(UUID uuid) {
    if (!connectionChecks.containsKey(uuid)) {
      Log.debug("Received uuid %s but could not find any checks with this uuid.", uuid);
      return;
    }
    ConnectionCheck check = connectionChecks.get(uuid);
    if (check.status == Status.FAILED) {
      Log.debug("Received uuid %s for a connection check, but it already timed out.", uuid);
      return;
    }
    if (check.status == Status.OPEN) {
      Log.debug("Received uuid %s.  Connection is verified!", uuid);
      check.status = Status.PASSED;
      return;
    }
    if (check.status == Status.PASSED) {
      Log.debug("Received uuid %s, but the connection was already verified.  Ignoring.", uuid);
      return;
    }
    return;
  }

  private ConnectionService() {

  }

  private static class ConnectionCheck {
    private volatile Status status = Status.OPEN;
    private int connectionTimeoutMillis;

    private ConnectionCheck(ClientSocket socket, int connectionTimeoutMillis) {
      this.connectionTimeoutMillis = connectionTimeoutMillis;
    }

    private void awaitConfirmation() {
      long now = System.currentTimeMillis();
      long start = now;
      while (now < start + connectionTimeoutMillis) {
        if (status == Status.PASSED) {
          return;
        }
        now = System.currentTimeMillis();
        continue;
      }
      status = Status.FAILED;
      return;
    }

  }

  private static enum Status {
    OPEN, PASSED, FAILED;
  }

}
