package dc4.arch.game;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;

import ox.Json;

public class Move {

  public final Position position;

  public final int column;

  public Move(Position position, int column) {
    this.position = checkNotNull(position);
    checkState(position != Position.UNDEFINED);
    this.column = column;
  }

  public static Move fromJson(Json json) {
    return new Move(json.getEnum("position", Position.class), json.getInt("column"));
  }

  public Json toJson() {
    return Json.object().with("position", position.name()).with("column", column);
  }

  @Override
  public String toString() {
    return String.format("(%d, %d)", position.asNumber(), column);
  }

}
