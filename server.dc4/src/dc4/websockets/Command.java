package dc4.websockets;

import java.util.function.Consumer;
import java.util.function.Predicate;

/**
 * WebSocketListeners handle all messages the same: get the {@code command} from the header, and run some code for that
 * command on the Json {@code data}. They do this by registering {@code Command} objects.
 */
public class Command {

  /**
   * Must be in the header of the client request.
   */
  public final String name;

  /**
   * The {@code data} field of the client request must pass this test, or a canned response is returned to the client.
   */
  public final Predicate<WebSocketMessage> validTest;

  /**
   * What I do with the data once I've determined it's valid.
   */
  public final Consumer<WebSocketMessage> onResponse;

  public Command(String name, Predicate<WebSocketMessage> validTest, Consumer<WebSocketMessage> onResponse) {
    this.name = name;
    this.validTest = validTest;
    this.onResponse = onResponse;
  }

}
