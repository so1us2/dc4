package dc4.service;

import java.util.Map;
import java.util.UUID;

import com.google.common.collect.Maps;

import dc4.arch.HumanPlayer;
import dc4.arch.game.Game;
import dc4.arch.game.GameHandler;
import dc4.websockets.GameListener.GameMessage;

public class GameService {

  private static final GameService instance = new GameService();

  private final Map<UUID, GameHandler> gameHandlers = Maps.newConcurrentMap();

  public static GameService get() {
    return instance;
  }

  public void startGame(HumanPlayer player1, HumanPlayer player2) {
    UUID handlerUUID = UUID.randomUUID();
    gameHandlers.put(handlerUUID, new GameHandler(handlerUUID, new Game(player1, player2)));
  }

  public void handleTestRequest(GameMessage message) {
    gameHandlers.get(message.gameUUID).processTestRequest(message);
  }

}
