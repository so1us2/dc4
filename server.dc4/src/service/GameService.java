package backend.service;

import java.util.Collection;

import com.google.common.collect.Lists;

import backend.arch.Game;
import backend.arch.HumanPlayer;

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
