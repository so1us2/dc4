package dc4.service;

import java.util.Map;
import java.util.UUID;

import com.google.common.collect.Maps;

import dc4.arch.HumanPlayer;
import dc4.arch.game.Game;
import dc4.arch.game.GameHandler;
import dc4.websockets.GameListener.GameMessage;
import dc4.websockets.WebSocketMessage;
import ox.Log;

public class GameService {

  private static final GameService instance = new GameService();

  private final Map<UUID, GameHandler> gameHandlers = Maps.newConcurrentMap();

  public static GameService get() {
    return instance;
  }

  public void startGame(HumanPlayer player1, HumanPlayer player2) {
    startGame(player1, player2, UUID.randomUUID(), true);
  }

  public void startGame(HumanPlayer player1, HumanPlayer player2, UUID gameUUID, boolean sendStartMessage) {
    GameHandler gameHandler = new GameHandler(gameUUID, new Game(player1, player2));
    gameHandlers.put(gameUUID, gameHandler);
    if (sendStartMessage) {
      gameHandler.sendStartMessages();
    }
  }

  /**
   * If a player was disconnected, this allows them to send their Game UUID and Player UUID to reconnect. (Useful for
   * testing.)
   */
  public void handleReconnectRequest(WebSocketMessage message) {
    Log.debug("Received reconnect request: %s", message);
    UUID gameUUID = UUID.fromString(message.data.get("gameUUID"));
    UUID playerUUID = UUID.fromString(message.data.get("playerUUID"));
    GameHandler gameHandler = gameHandlers.get(gameUUID);
    gameHandler.processReconnectRequest(playerUUID, message.socket);
  }

  /**
   * Stupid test request that increments a counter that both players can see.
   */
  public void handleTestRequest(GameMessage message) {
    GameHandler gameHandler = gameHandlers.get(message.gameUUID);
    gameHandler.processTestRequest(message);
  }

}
