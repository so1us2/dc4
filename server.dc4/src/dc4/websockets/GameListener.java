package dc4.websockets;

import static com.google.common.base.Preconditions.checkState;

import java.util.Map;
import java.util.UUID;

import com.google.common.collect.Maps;

import bowser.websocket.ClientSocket;
import dc4.arch.Game;
import ox.Json;

public class GameListener extends WebSocketListener {

  private static final GameListener instance = new GameListener();

  private final Map<UUID, Game> games = Maps.newHashMap();

  private GameListener() {
    super("game");
  }

  public static GameListener get() {
    return instance;
  }

  public void register(Game game) {
    checkState(!games.containsKey(game.uuid));
    games.put(game.uuid, game);
  }

  @Override
  protected void handle(String command, Json data, ClientSocket socket) {

    if (!data.has("token")) {
      socket.send(Json.object().with("message", "Unable to process this command without a token."));
    }

    UUID uuid = UUID.fromString(data.get("token"));
    if (!games.containsKey(uuid)) {
      socket.send(Json.object().with("message", "Invalid token."));
    }

    games.get(uuid).handle(command, data, socket);
  }

}
