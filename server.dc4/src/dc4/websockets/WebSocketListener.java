package dc4.websockets;

import java.util.Map;

import com.google.common.collect.Maps;

public abstract class WebSocketListener implements WebSocketHandler {

  public final String channel;

  private final Map<String, Command> commands = Maps.newHashMap();

  public WebSocketListener(String channel) {
    this.channel = channel;
  }

  public void command(Command command) {
    commands.put(command.name, command);
  }

  @Override
  public void handle(WebSocketMessage message) {
    Command command = commands.get(message.command);
    if (!command.validTest.test(message)) {
      message.socket.send(WebSocketMessage.plainMessage(
          "Invalid data for command " + message.command + ": " + message.data.toString()));
      return;
    }
    command.onResponse.accept(message);
  }

}
