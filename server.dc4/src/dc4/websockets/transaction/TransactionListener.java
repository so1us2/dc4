package dc4.websockets.transaction;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import dc4.websockets.Command;
import dc4.websockets.WebSocketListener;
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
        responses.put(uuid, data); // Put the response where the transaction's execution thread can find it.
      });



}
