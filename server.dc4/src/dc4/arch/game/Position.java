package dc4.arch.game;

import static com.google.common.base.Preconditions.checkState;

public enum Position {

  FIRST, SECOND, UNDEFINED;

  public static Position other(Position position) {
    checkState(position != UNDEFINED);
    return position == FIRST ? SECOND : FIRST;
  }

  public int asNumber() {
    if (this == FIRST) {
      return 1;
    } else if (this == SECOND) {
      return 2;
    } else {
      throw new UnsupportedOperationException();
    }
  }
}
