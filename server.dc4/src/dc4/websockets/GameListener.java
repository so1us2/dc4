package dc4.websockets;

import static com.google.common.base.Preconditions.checkState;

import java.util.Map;
import java.util.UUID;

import com.google.common.collect.Maps;

import dc4.arch.Game;

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
  protected void handle(WebSocketMessage message) {

    if (!message.data.has("token")) {
      message.socket.send(WebSocketMessage.plainMessage("Unable to process this command without a token."));
    }

    UUID uuid = UUID.fromString(message.data.get("token"));
    if (!games.containsKey(uuid)) {
      message.socket.send(WebSocketMessage.plainMessage("Invalid token."));
    }

    games.get(uuid).handle(message);
  }

}
