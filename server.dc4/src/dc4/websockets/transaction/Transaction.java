package dc4.websockets.transaction;

import static com.google.common.base.Preconditions.checkNotNull;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;
import java.util.function.Function;
import java.util.function.Supplier;

import dc4.arch.Time;
import dc4.websockets.DC4ClientSocket;
import dc4.websockets.WebSocketMessage;
import ox.Json;

/**
 * This transaction is *not* asynchronous, so do not run in a critical-path thread.
 */
public class Transaction<T> {

  public volatile boolean receivedResponse = false;

  public volatile Json responseJson = null;

  private DC4ClientSocket socket;

  UUID uuid;

  private WebSocketMessage message;

  private static final long DEFAULT_TIMEOUT_MILLIS = 2000;

  private long timeoutMillis = DEFAULT_TIMEOUT_MILLIS;

  boolean requestSuccessful = false;

  private Supplier<T> onFail;

  private Function<Json, T> onResponse;

  private T result = null;

  private final TransactionListener transactionListener = TransactionListener.get();

  public Transaction(DC4ClientSocket socket) {
    this.socket = socket;
    this.uuid = UUID.randomUUID();
  }

  /**
   * Adds a transactionUUID field to the data field of the message so that the client can identify the transaction in
   * its response. Therefore, transactionUUID is a reserved word for data fields in outgoing transaction.
   */
  public Transaction<T> message(WebSocketMessage message) {
    checkNotNull(message);
    message.data.with("transactionUUID", uuid);
    this.message = message;
    return this;
  }

  public Transaction<T> setTimeoutMillis(long millis) {
    this.timeoutMillis = millis;
    return this;
  }

  public Transaction<T> onFail(Supplier<T> onFail) {
    this.onFail = onFail;
    return this;
  }

  public Transaction<T> onResponse(Function<Json, T> onResponse) {
    this.onResponse = onResponse;
    return this;
  }

  public Transaction<T> execute() {
    Time time = new Time();
    Instant start = time.nowAsInstant();
    Instant end = start.plus(Duration.ofMillis(timeoutMillis));

    try {
      socket.send(message);
    } catch (Exception e) {
      result = onFail.get();
      return this;
    }
    
    transactionListener.register(this);

    try {
      this.wait(timeoutMillis);
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    }

    if (receivedResponse) {
      result = onResponse.apply(responseJson);
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