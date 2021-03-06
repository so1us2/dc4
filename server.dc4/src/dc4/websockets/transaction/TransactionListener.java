package dc4.websockets.transaction;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import dc4.websockets.Command;
import dc4.websockets.WebSocketListener;
import dc4.websockets.WebSocketMessage;
import ox.Json;
import ox.Log;

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
      message -> message.data.hasKey("transactionUUID"), // response data must have a UUID.
      message -> {
        Log.debug("Transaction Listener processing message: %s", message);
        UUID uuid = UUID.fromString(message.data.get("transactionUUID"));
        message.data.remove("transactionUUID");
        Transaction<?> transaction;
        synchronized (openTransactions) {
          if (!openTransactions.containsKey(uuid)) {
            message.socket.send(WebSocketMessage.plainMessage("Invalid transaction UUID."));
          }
          transaction = openTransactions.remove(uuid);
        }
        synchronized (transaction) {
          transaction.receivedResponse = true;
          transaction.responseJson = message.data;
          transaction.notify();
        }
      });

  /**
   * Notifiy the transaction if it receives a response.
   */
  public void register(Transaction<?> t) {
    openTransactions.put(t.uuid, t);
  }
}
