package dc4.arch;

import static com.google.common.base.Preconditions.checkNotNull;
import static ox.util.Utils.checkNotEmpty;
import static ox.util.Utils.normalize;

import java.util.UUID;

import dc4.websockets.DC4ClientSocket;

public class HumanPlayer {

  public final DC4ClientSocket socket;

  public final String name;

  public UUID uuid;

  public HumanPlayer(String name, DC4ClientSocket socket) {
    this.socket = checkNotNull(socket);
    this.name = checkNotEmpty(normalize(name));
  }
}
