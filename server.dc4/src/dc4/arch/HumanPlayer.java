package dc4.arch;

import static com.google.common.base.Preconditions.checkState;
import static ox.util.Utils.checkNotEmpty;
import static ox.util.Utils.normalize;

import java.util.UUID;

import dc4.websockets.DC4ClientSocket;
import ox.Json;

public class HumanPlayer {

  public DC4ClientSocket socket;

  public final String name;

  public final UUID uuid;

  public Position position = Position.UNDEFINED;

  public HumanPlayer(String name, UUID uuid) {
    this(name, uuid, null);
  }

  public HumanPlayer(String name, UUID uuid, DC4ClientSocket socket) {
    this.name = checkNotEmpty(normalize(name));
    this.uuid = uuid;
    this.socket = socket;
  }

  public static enum Position {
    FIRST, SECOND, UNDEFINED;

    public static Position other(Position position) {
      checkState(position != UNDEFINED);
      return position == FIRST ? SECOND : FIRST;
    }
  }

  public Json toJson() {
    return Json.object().with("position", position.name()).with("name", name);
  }
}
