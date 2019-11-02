package backend.api;

import backend.websockets.DC4WebSockets;
import backend.websockets.GameListener;
import backend.websockets.MatchmakingListener;
import backend.websockets.TestListener;
import backend.websockets.TransactionListener;
import bowser.WebServer;
import ox.Log;

public class DC4Server {

  private static final int PORT = 1501;

  public static final int WEBSOCKET_PORT = 39142;

  public void start() {

    new WebServer("DC4", PORT, true).controller(new TestAPI()).start();
    Log.debug("API Server running on port %d", PORT);

    new DC4WebSockets()
        .listener(MatchmakingListener.get())
        .listener(GameListener.get())
        .listener(TestListener.get())
        .listener(TransactionListener.get())
        .start();

    Log.debug("Websocket server listening on port %d", WEBSOCKET_PORT);

  }

  public static void main(String[] args) {
    new DC4Server().start();

  }

}
