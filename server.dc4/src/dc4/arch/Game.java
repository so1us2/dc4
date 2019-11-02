package dc4.arch;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.UUID;

import bowser.websocket.ClientSocket;
import dc4.websockets.GameListener;
import ox.Json;
import ox.Log;

public class Game {

  public final HumanPlayer player1;
  public final HumanPlayer player2;
  public UUID uuid;

  public Game(HumanPlayer player1, HumanPlayer player2) {
    this.player1 = checkNotNull(player1);
    this.player2 = checkNotNull(player2);
  }

  public void start() {
    uuid = UUID.randomUUID();
    GameListener.get().register(this);
  }

  public void handle(String command, Json json, ClientSocket socket) {
    Log.debug("Received command %s with data %s from socket %s.", command, json.toString(), socket);
    socket.send(Json.object().with("message", "just parroting back the request").with("data", json));
  }
}
