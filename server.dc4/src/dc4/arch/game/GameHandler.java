package dc4.arch.game;

import java.util.UUID;

import dc4.arch.HumanPlayer;
import dc4.websockets.DC4ClientSocket;
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

  public void processReconnectRequest(UUID playerUUID, DC4ClientSocket socket) {
    HumanPlayer player;
    if (game.player1.uuid.equals(playerUUID)) {
      player = game.player1;
    } else if (game.player2.uuid.equals(playerUUID)) {
      player = game.player2;
    } else {
      socket.send(WebSocketMessage.plainMessage("Did not recognize this player UUID.  Reconnection failed."));
      return;
    }
    player.socket = socket;
    player.socket.send(
            new WebSocketMessage("game", "reconnect", Json.object().with("gameState", getGameState(player.position))));
  }

  public void sendStartMessages() {
    game.player1.socket
        .send(new WebSocketMessage("game", "start", Json.object().with("gameState", getGameState(Position.FIRST))));
    game.player2.socket
        .send(new WebSocketMessage("game", "start", Json.object().with("gameState", getGameState(Position.SECOND))));
  }

  public void processTestRequest(GameMessage message) {
    Log.debug("GameHandler got the message: %s", message);
    broadcast(new WebSocketMessage("game", "testResponse", Json.object().with("counter", ++game.counter)));
  }

  public void processMoveRequest(Move move) {
    Log.debug("GameHandler got the move: %s", move);
    broadcast(new WebSocketMessage("game", "move", Json.object()
        .with("move", move.toJson())
        .with("gameState", getGameState(Position.UNDEFINED))));
  }

  public void broadcast(WebSocketMessage message) {
    try {
      game.player1.socket.send(message);
    } catch (Exception e) {
      Log.debug("Could not send message to Player 1.");
    }
    try {
      game.player2.socket.send(message);
    } catch (Exception e) {
      Log.debug("Could not send message to Player 2");
    }
  }

  private Json getGameState(Position position) {
    HumanPlayer player = game.getPlayer(position);

    return Json.object()
        .with("gameUUID", uuid)
        .with("playerUUID", (player == null) ? null : player.uuid)
        .with("position", position)
        .with("currentTurn", game.currentTurn)
        .with("counter", game.counter)
        .with("player1", game.player1.toJson())
        .with("player2", game.player2.toJson());
  }
}
