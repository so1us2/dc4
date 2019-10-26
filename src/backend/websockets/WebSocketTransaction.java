package backend.websockets;

import static com.google.common.base.Preconditions.checkNotNull;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Supplier;

import backend.arch.Time;
import bowser.websocket.ClientSocket;
import ox.Json;

/**
 * In my great and unmatched wisdom, I am making this a blocking transaction. So... ya know... use it at your own risk?
 */
public class WebSocketTransaction<T> {

  private static final Map<UUID, Json> responses = new ConcurrentHashMap();

  private ClientSocket socket;

  private UUID uuid;

  private Json message;

  private long timeoutMillis = 2000;

  private Supplier<T> onFail;

  private Function<Json, T> onResponse;

  private T result;

  public WebSocketTransaction(ClientSocket socket) {
    this.socket = socket;
    this.uuid = UUID.randomUUID();
  }

  public WebSocketTransaction<T> message(Json messagePayload) {
    checkNotNull(messagePayload);
    Json json = Json.object()
        .with("channel", "transaction")
        .with("command", "transaction")
        .with("payload", messagePayload).with("dc4TransactionUUID", uuid);
    this.message = json;
    return this;
  }

  public WebSocketTransaction<T> setTimeoutMillis(long millis) {
    this.timeoutMillis = millis;
    return this;
  }

  public WebSocketTransaction<T> onFail(Supplier<T> onFail) {
    this.onFail = onFail;
    return this;
  }

  public WebSocketTransaction<T> onResponse(Function<Json, T> onResponse) {
    this.onResponse = onResponse;
    return this;
  }

  public WebSocketTransaction<T> execute() {
    Time time = new Time();
    Instant start = time.nowAsInstant();
    Instant end = start.plus(Duration.ofMillis(timeoutMillis));
    socket.send(message);
    while (time.nowAsInstant().isBefore(end)) {
      synchronized (responses) {
        if (responses.containsKey(uuid)) {

        }
        Thread.yield();
      }
    }
    return this;
  }

  public T getResult() {
    return result;
  }

}
