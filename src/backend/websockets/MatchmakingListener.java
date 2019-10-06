package backend.websockets;

import bowser.websocket.ClientSocket;
import ox.Json;
import ox.Log;

public class MatchmakingListener extends WebSocketListener {

  public MatchmakingListener() {
    super("matchmaking");
  }

  @Override
  protected void handle(String command, Json data, ClientSocket socket) {
    Log.info("Matchmaking listener received command %s and data:", command);
    Log.info(data);
    Log.info("Sending back an 'Ok' message.");
    socket.send(Json.object().with("message", "Ok"));
  }

}
