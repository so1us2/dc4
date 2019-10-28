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

public class TransactionListener extends WebSocketListener {

  private static final TransactionListener instance = new TransactionListener();

  private static final Map<UUID, Json> responses = new ConcurrentHashMap<UUID, Json>();

  public static TransactionListener get() {
    return instance;
  }

  private TransactionListener() {
    super("transaction");
    command(response);
  }

  Command response = new Command("response",
      data -> data.hasKey("transactionUUID"), // response data must have a UUID.
      (data, socket) -> {
        UUID uuid = UUID.fromString(data.get("transactionUUID"));
        data.remove("transactionUUID");
        synchronized (responses) {
          responses.put(uuid, data); // Put the response where the transaction's execution thread can find it.
        }
      });

  /**
   * In my great and unmatched wisdom, I am making this a blocking transaction. So... ya know... use it at your own
   * risk?
   */
  public static class WebSocketTransaction<T> {

    private ClientSocket socket;

    private UUID uuid;

    private Json message;

    private static final long DEFAULT_TIMEOUT_MILLIS = 2000;

    private long timeoutMillis = DEFAULT_TIMEOUT_MILLIS;

    boolean requestSuccessful = false;

    private Supplier<T> onFail;

    private Function<Json, T> onResponse;

    private T result = null;

    public WebSocketTransaction(ClientSocket socket) {
      this.socket = socket;
      this.uuid = UUID.randomUUID();
    }

    /**
     * Adds a transactionUUID field to the data field of the message so that the client can identify the transaction in
     * its response. Therefore, transactionUUID is a reserved word for data fields in outgoing transaction.
     */
    public WebSocketTransaction<T> message(Json message) {
      checkNotNull(message);
      message.getJson("data").with("transactionUUID", uuid);
      this.message = message;
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

      try {
        socket.send(message);
      } catch (Exception e) {
        result = onFail.get();
        return this;
      }

      while (time.nowAsInstant().isBefore(end)) {
        synchronized (responses) {
          if (responses.containsKey(uuid)) {
            break;
          } else {
            Thread.yield();
          }
        }
      }

      synchronized (responses) {
        if (responses.containsKey(uuid)) {
          result = onResponse.apply(responses.get(uuid));
          requestSuccessful = true;
        }
      }

      if (!requestSuccessful) {
        result = onFail.get();
      }

      return this;
    }

    public T getResult() {
      return result;
    }

  }

}
