package backend.websockets;

import java.util.Map;

import com.google.common.collect.Maps;

import bowser.websocket.ClientSocket;
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

  protected void handle(String commandName, Json data, ClientSocket socket) {
    if (!commands.containsKey(commandName)) {
      socket.send(Json.object().with("message", "Invalid command: " + commandName));
      return;
    }
    Command command = commands.get(commandName);
    if (!command.validTest.test(data)) {
      socket.send(Json.object().with("message", "Invalid data for command " + commandName + ": " + data.toString()));
      return;
    }
    command.onResponse.accept(data, socket);
  }

}
