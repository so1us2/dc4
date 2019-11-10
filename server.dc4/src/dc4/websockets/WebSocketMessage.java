package dc4.websockets;

import ox.Json;

public class WebSocketMessage {

  public final String channel;

  public final String command;

  public final Json data;

  public DC4ClientSocket socket;

  public WebSocketMessage(String channel, String command) {
    this(channel, command, Json.object());
  }

  public WebSocketMessage(String channel, String command, Json data) {
    this(channel, command, data, null);
  }

  public WebSocketMessage(String channel, String command, Json data, DC4ClientSocket socket) {
    this.channel = channel;
    this.command = command;
    this.data = data;
    this.socket = socket;
  }

  public WebSocketMessage withSocket(DC4ClientSocket socket) {
    this.socket = socket;
    return this;
  }

  @Override
  public String toString() {
    return String.format("channel: %s, command: %s, data: %s", channel, command, data.toString());
  }

  public Json toJson() {
    return Json.object().with("channel", channel).with("command", command).with("data", data);
  }

  public static WebSocketMessage plainMessage(String message) {
    return new WebSocketMessage(null, null, Json.object().with("message", message));
  }
}