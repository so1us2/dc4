package dc4.arch;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.UUID;

import dc4.websockets.GameListener;
import dc4.websockets.WebSocketMessage;
import ox.Log;

public class Game {

  public final HumanPlayer player1;
  public final HumanPlayer player2;
  public UUID uuid;

  public Game(HumanPlayer player1, HumanPlayer player2) {
    this.player1 = checkNotNull(player1);
    this.player2 = checkNotNull(player2);
  }

  public void start() {
    uuid = UUID.randomUUID();
    GameListener.get().register(this);
  }

  public void handle(WebSocketMessage message) {
    // just parrot back the response. Soon we'll do things with this.
    Log.debug("Game %s received WebSocketMessage: %s", message.toString());
    message.socket.send(WebSocketMessage.plainMessage("Game received your response: " + message.toString()));
  }
}
