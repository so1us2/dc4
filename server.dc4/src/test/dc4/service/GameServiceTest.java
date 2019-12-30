package test.dc4.service;

import java.util.UUID;

import dc4.DC4Server;
import dc4.arch.HumanPlayer;
import dc4.arch.game.Position;
import dc4.service.GameService;
import dc4.websockets.DC4WebSockets;
import dc4.websockets.GameListener;
import dc4.websockets.transaction.TransactionListener;
import ox.Log;

/**
 * Convenience methods for creating games in the GameService for faster testing.
 */
public class GameServiceTest {

  public final UUID testGameUUID = UUID.fromString("1e38af78-1b9f-4bae-923e-20661a0a3058");

  public final UUID player1UUID = UUID.fromString("f7038575-526a-4293-aa3e-0b5d8564a1f9");

  public final UUID player2UUID = UUID.fromString("353582ca-67e2-4f18-87ac-4591809d516a");

  private final GameService gameService = GameService.get();

  public void startTestGame() {
    HumanPlayer player1 = new HumanPlayer("Mazer", player1UUID);
    player1.position = Position.FIRST;
    HumanPlayer player2 = new HumanPlayer("Ender", player2UUID);
    player2.position = Position.SECOND;
    gameService.startGame(player1, player2, testGameUUID, false);
  }

  public static void main(String... args) {
    new DC4WebSockets()
        .listener(GameListener.get())
        .listener(TransactionListener.get())
        .start();

    new GameServiceTest().startTestGame();

    Log.debug("Websocket server listening on port %d", DC4Server.WEBSOCKET_PORT);
  }
}
