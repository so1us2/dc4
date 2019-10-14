package backend.websockets;

import java.util.List;

import com.google.common.collect.Lists;

import backend.api.DC4Server;
import bowser.websocket.ClientSocket;
import bowser.websocket.WebSocketServer;
import ox.Json;
import ox.Log;

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
    server.onOpen(this::listenToSocket).start();
  }

  private void listenToSocket(ClientSocket socket) {
    Log.info("Client connected: " + socket);
    socket.onMessage(s -> delegateMessageToListeners(s, socket));
  }

  private void delegateMessageToListeners(String s, ClientSocket socket) {
    Log.debug("Processing request from socket %s", socket);
    if (!isValidMessage(s)) {
      Log.info("Received malformed websocket message: %s", s);
      return;
    }
    WebSocketMessage message = parseWebSocketMessage(s);
    Log.info("Processing websocket message: " + message);
    for (WebSocketListener listener : listeners) {
      if (message.channel.equals(listener.channel)) {
        listener.handle(message.command, message.data, socket);
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

  private static class WebSocketMessage {

    private final String channel;

    private final String command;

    private final Json data;

    private WebSocketMessage(String channel, String command, Json data) {
      this.channel = channel;
      this.command = command;
      this.data = data;
    }

  }
}
