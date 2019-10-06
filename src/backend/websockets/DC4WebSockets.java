package backend.websockets;

import java.util.List;

import com.google.common.collect.Lists;

import backend.api.DC4Server;
import bowser.websocket.WebSocketServer;

public class DC4WebSockets {

  private final WebSocketServer server;

  private final List<WebSocketListener> listeners;

  public DC4WebSockets() {
    this.server = new WebSocketServer(DC4Server.WEBSOCKET_PORT);
    this.listeners = Lists.newArrayList();
  }

  public DC4WebSockets listener(WebSocketListener listener) {
    listeners.add(listener);
    return this;
  }

  public void start() {
    // TODO: STUFF SHOULD HAPPEN HERE.
  }
}
