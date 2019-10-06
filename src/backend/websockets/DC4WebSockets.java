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
    server.onOpen(this::listenToSocket);
  }

  private void listenToSocket(ClientSocket socket) {
    Log.info("Client connected: " + socket);
    socket.onMessage(s -> delegateMessageToListeners(s, socket));
  }

  private void delegateMessageToListeners(String s, ClientSocket socket) {
    if (!isValidMessage(s)) {

    }
    WebSocketMessage message = parseWebSocketMessage(s);
    if (message == null) {
      socket.send(Json.object().with(
          "message", "Invalid websocket command.  Must specify channel, command, and data."));
      return;
    }
    for (WebSocketListener listener : listeners) {
      if (message.channel.equals(listener.channel)) {
        listener.handle(message.command, message.data, socket);
      }
    }
  }

  private boolean isValidMessage(String s) {
    return true;
  }

  private WebSocketMessage parseWebSocketMessage(String message) {
    Json json;
    try {
      json = new Json(message);
    } catch (Exception e) {
      Log.info("Could not parse websocket message.  It must be in JSON format.  Message was:");
      Log.info(message);
      return null;
    }

    if (!json.hasKey("channel")) {
      Log.info("Received websocket message without channel.");
      return null;
    }

    if (!json.hasKey("command")) {
      Log.info("Received websocket message without command");
      return null;
    }

    if (!json.hasKey("data")) {
      Log.info("Received websocket message without data");
      return null;
    }

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
