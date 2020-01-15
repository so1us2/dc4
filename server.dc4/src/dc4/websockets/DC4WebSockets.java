package dc4.websockets;

import java.util.List;

import javax.net.ssl.SSLContext;

import com.google.common.collect.Lists;

import bowser.SSLUtils;
import bowser.websocket.ClientSocket;
import bowser.websocket.WebSocketServer;
import dc4.DC4Server;
import ox.Config;
import ox.Json;
import ox.Log;
import ox.Threads;

public class DC4WebSockets {

  private final WebSocketServer server;

  private final List<WebSocketListener> listeners;

  private final Config config = Config.load("dc4");

  private final String serverType = config.get("serverType");

  public DC4WebSockets() {
    boolean isProduction = serverType.equals("prod");
    Log.debug("server isProduction? %s", isProduction);
    SSLContext context = isProduction ? SSLUtils.createContext("jakemirra.com") : null;
    this.server = new WebSocketServer(DC4Server.WEBSOCKET_PORT);
    this.server.ssl(context);
    this.listeners = Lists.newArrayList();
  }

  public DC4WebSockets listener(WebSocketListener listener) {
    listeners.add(listener);
    return this;
  }

  public void start() {
    server.onOpen(this::listenToSocket).start();
  }

  private void listenToSocket(ClientSocket socket) {
    Log.info("Client connected: " + socket);
    socket.onMessage(s -> Threads.run(() -> delegateMessageToListeners(s, new DC4ClientSocket(socket))));
  }

  private void delegateMessageToListeners(String s, DC4ClientSocket socket) {
    if (!isValidMessage(s)) {
      Log.info("Received malformed websocket message: %s", s);
      return;
    }
    WebSocketMessage message = parseWebSocketMessage(s).withSocket(socket);
    Log.info("Processing websocket message: " + message);
    for (WebSocketListener listener : listeners) {
      if (message.channel.equals(listener.channel)) {
        listener.handle(message);
        return;
      }
    }
  }

  private boolean isValidMessage(String s) {
    Json json;
    try {
      json = new Json(s);
    } catch (Exception e) {
      return false;
    }
    return (json.hasKey("channel") && json.hasKey("command") && json.hasKey("data"));
  }

  private WebSocketMessage parseWebSocketMessage(String message) {
    Json json = new Json(message);
    return new WebSocketMessage(json.get("channel"), json.get("command"), json.getJson("data"));
  }


}
