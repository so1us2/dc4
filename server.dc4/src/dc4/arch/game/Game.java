package dc4.arch.game;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import dc4.arch.HumanPlayer;
import ox.Json;

public class Game {

  public final HumanPlayer player1;

  public final HumanPlayer player2;

  public int counter = 0;

  public Position currentTurn = Position.FIRST;

  public Queue<Move> moveHistory = new ConcurrentLinkedQueue<>();

  public Game(HumanPlayer player1, HumanPlayer player2) {
    this.player1 = checkNotNull(player1);
    this.player2 = checkNotNull(player2);
  }

  public void makeMove(Move move) {
    moveHistory.add(move);
    currentTurn = Position.other(currentTurn);
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

  public Json toJson() {
    return Json.object()
        .with("currentTurn", currentTurn)
        .with("player1", player1.toJson())
        .with("player2", player2.toJson())
        .with("moveHistory", Json.array(moveHistory, Move::toJson));
  }

}
