package dc4.arch.game;

import static com.google.common.base.Preconditions.checkNotNull;

import dc4.arch.HumanPlayer;

public class Game {

  public final HumanPlayer player1;

  public final HumanPlayer player2;

  public int counter = 0;

  public Position currentTurn = Position.FIRST;

  public Game(HumanPlayer player1, HumanPlayer player2) {
    this.player1 = checkNotNull(player1);
    this.player2 = checkNotNull(player2);
  }

  public HumanPlayer getPlayer(Position position) {
    switch (position) {
    case FIRST:
      return player1;
    case SECOND:
      return player2;
    default:
      return null;
    }
  }

}
