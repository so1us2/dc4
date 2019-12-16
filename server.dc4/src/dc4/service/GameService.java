package dc4.service;

import java.util.Map;
import java.util.UUID;

import com.google.common.collect.Maps;

import dc4.arch.HumanPlayer;
import dc4.arch.game.Game;
import dc4.arch.game.GameHandler;
import dc4.websockets.GameListener.GameMessage;
import dc4.websockets.WebSocketMessage;
import ox.Json;

public class GameService {

  private static final GameService instance = new GameService();

  private final Map<UUID, GameHandler> gameHandlers = Maps.newConcurrentMap();

  public static GameService get() {
    return instance;
  }

  public void startGame(HumanPlayer player1, HumanPlayer player2) {
    UUID gameUUID = UUID.randomUUID();
    gameHandlers.put(gameUUID, new GameHandler(gameUUID, new Game(player1, player2)));
    player1.socket.send(new WebSocketMessage("game", "start", Json.object()
        .with("gameUUID", gameUUID)
        .with("playerUUID", player1.uuid)
        .with("position", "FIRST")));
    player2.socket.send(new WebSocketMessage("game", "start", Json.object()
        .with("gameUUID", gameUUID)
        .with("playerUUID", player2.uuid)
        .with("position", "SECOND")));
  }

  public void handleTestRequest(GameMessage message) {
    GameHandler gameHandler = gameHandlers.get(message.gameUUID);
    gameHandler.processTestRequest(message);
  }

}
