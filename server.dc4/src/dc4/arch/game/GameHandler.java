package dc4.arch.game;

import java.util.UUID;

import dc4.websockets.GameListener.GameMessage;
import dc4.websockets.WebSocketMessage;
import ox.Json;
import ox.Log;

/**
 * Provides API for managing the state of a single game.
 */
public class GameHandler {

  private final UUID uuid;

  private final Game game;

  public GameHandler(UUID uuid, Game game) {
    this.uuid = uuid;
    this.game = game;
  }

  public void processTestRequest(GameMessage message) {
    Log.debug("Congratulations.  Control made it to a Game Handler which got the message: %s", message);
    broadcast(new WebSocketMessage("game", "testResponse", Json.object().with("counter", ++game.counter)));
  }

  public void broadcast(WebSocketMessage message) {
    game.player1.socket.send(message);
    game.player2.socket.send(message);
  }
}
