package dc4.arch;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;
import static ox.util.Utils.checkNotEmpty;
import static ox.util.Utils.normalize;

import java.util.UUID;

import dc4.websockets.DC4ClientSocket;

public class HumanPlayer {

  public final DC4ClientSocket socket;

  public final String name;

  public UUID uuid;

  public Position position = Position.UNDEFINED;

  public HumanPlayer(String name, DC4ClientSocket socket) {
    this.socket = checkNotNull(socket);
    this.name = checkNotEmpty(normalize(name));
  }

  public static enum Position {
    FIRST, SECOND, UNDEFINED;

    public static Position other(Position position) {
      checkState(position != UNDEFINED);
      return position == FIRST ? SECOND : FIRST;
    }
  }
}
