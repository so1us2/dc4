package dc4;

import bowser.WebServer;
import dc4.api.TestAPI;
import dc4.websockets.DC4WebSockets;
import dc4.websockets.GameListener;
import dc4.websockets.MatchmakingListener;
import dc4.websockets.TestListener;
import dc4.websockets.transaction.TransactionListener;
import ox.Log;

public class DC4Server {

  private static final int PORT = 1501;

  public static final int WEBSOCKET_PORT = 42069; // nice.

  public void start() {

    new WebServer("DC4", PORT, true)
        .controller(new TestAPI())
        .start();

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
