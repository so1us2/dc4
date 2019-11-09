package dc4.websockets;

import java.util.Map;

import com.google.common.collect.Maps;

import ox.Json;

public abstract class WebSocketListener {

  public final String channel;

  private final Map<String, Command> commands = Maps.newHashMap();

  public WebSocketListener(String channel) {
    this.channel = channel;
  }

  public void command(Command command) {
    commands.put(command.name, command);
  }

  protected void handle(WebSocketMessage message) {
    Command command = commands.get(message.command);
    if (!command.validTest.test(message.data)) {
      message.socket.send(Json.object().with(WebSocketMessage
          .plainMessage("Invalid data for command " + message.command + ": " + message.data.toString())));
      return;
    }
    command.onResponse.accept(data, socket);
  }

}
