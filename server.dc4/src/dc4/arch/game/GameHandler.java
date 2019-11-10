package dc4.arch.game;

import java.util.UUID;

import dc4.websockets.GameListener.GameMessage;
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
    Log.debug("Congratulation.  Control made it to a Game Handler which got the message: %s", message);
  }
}
