package dc4.service;

import java.util.Collection;

import com.google.common.collect.Lists;

import dc4.arch.Game;
import dc4.arch.HumanPlayer;

public class GameService {

  private static final GameService instance = new GameService();

  private final Collection<Game> activeGames = Lists.newArrayList();

  public static GameService get() {
    return instance;
  }

  public void startGame(HumanPlayer player1, HumanPlayer player2) {
    Game game = new Game(player1, player2);
    activeGames.add(game);
    game.start();
  }

  private GameService() {

  }

}
