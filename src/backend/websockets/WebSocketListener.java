package backend.websockets;

import bowser.websocket.ClientSocket;
import ox.Json;

public abstract class WebSocketListener {

  public final String channel;

  public WebSocketListener(String channel) {
    this.channel = channel;
  }

  protected abstract void handle(String command, Json data, ClientSocket socket);

}
