package backend.service;

import java.util.ArrayDeque;

import com.google.common.collect.Queues;

import backend.arch.HumanPlayer;
import bowser.websocket.ClientSocket;
import ox.Threads;

public class MatchmakingService {

  private final GameService gameService = GameService.get();
  private static final MatchmakingService instance = new MatchmakingService();
  static {
    instance.start();
  }

  private ArrayDeque<HumanPlayer> searchingPlayers = Queues.newArrayDeque();

  private MatchmakingService() {

  }

  public static MatchmakingService get() {
    return instance;
  }

  public void start() {
    Threads.run(this::makeMatches);
  }

  public void makeMatches() {
    while(true) {
      if(searchingPlayers.size() >= 2) {
        HumanPlayer player1 = searchingPlayers.remove();
        HumanPlayer player2 = searchingPlayers.remove();
        gameService.startGame(player1, player2);
      }
    }
  }

  public void startSearch(String name, ClientSocket socket) {
    searchingPlayers.add(new HumanPlayer(name, socket));
  }
}
