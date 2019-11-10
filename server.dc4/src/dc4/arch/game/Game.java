package dc4.arch.game;

import static com.google.common.base.Preconditions.checkNotNull;

import dc4.arch.HumanPlayer;

public class Game {

  public final HumanPlayer player1;
  public final HumanPlayer player2;

  public Game(HumanPlayer player1, HumanPlayer player2) {
    this.player1 = checkNotNull(player1);
    this.player2 = checkNotNull(player2);
  }

}
