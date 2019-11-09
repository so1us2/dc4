package dc4.websockets.transaction;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import dc4.websockets.Command;
import dc4.websockets.WebSocketListener;
import ox.Json;

public class TransactionListener extends WebSocketListener {

  private static final TransactionListener instance = new TransactionListener();

  public static final Map<UUID, Transaction<?>> openTransactions = new ConcurrentHashMap<UUID, Transaction<?>>();

  public static final Map<UUID, Json> responses = new ConcurrentHashMap<UUID, Json>();

  public static TransactionListener get() {
    return instance;
  }

  private TransactionListener() {
    super("transaction");
    command(response);
  }

  private Command response = new Command("response",
      data -> data.hasKey("transactionUUID"), // response data must have a UUID.
      (data, socket) -> {
        UUID uuid = UUID.fromString(data.get("transactionUUID"));
        data.remove("transactionUUID");
        Transaction<?> transaction;
        synchronized (openTransactions) {
          if (!openTransactions.containsKey(uuid)) {
            socket.send(Json.object().with("message", "Invalid transaction ID."));
          }
          transaction = openTransactions.remove(uuid);
        }
        transaction.receivedResponse = true;
        transaction.responseJson = data;
        transaction.notify();
      });

  /**
   * Notifiy the transaction if it receives a response.
   */
  public void register(Transaction<?> t) {
    openTransactions.put(t.uuid, t);
  }
}
