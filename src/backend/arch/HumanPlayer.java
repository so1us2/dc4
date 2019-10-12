package backend.arch;

import static com.google.common.base.Preconditions.checkNotNull;
import static ox.util.Utils.checkNotEmpty;
import static ox.util.Utils.normalize;

import bowser.websocket.ClientSocket;

public class HumanPlayer {

  public final ClientSocket socket;

  public final String name;

  public HumanPlayer(String name, ClientSocket socket) {
    this.socket = checkNotNull(socket);
    this.name = checkNotEmpty(normalize(name));
  }
}
