package backend.api;

import bowser.WebServer;
import bowser.websocket.WebSocketServer;
import ox.Json;
import ox.Log;

public class DC4Server {

  private static final int PORT = 1501;

  public static final int WEBSOCKET_PORT = 39142;

  public void start() {

    new WebServer("DC4", PORT, true).controller(new TestAPI()).start();
    Log.debug("Server running on port %d", PORT);

    new WebSocketServer(WEBSOCKET_PORT).onOpen(socket -> {
      System.out.println("Client connected: " + socket);
      socket.onMessage(s -> {
        Log.info("Received message: " + s);
        Log.info("As JSON: " + new Json(s));
        socket.send(new Json("{a:1, c:15}"));
      });
    }).start();
    Log.debug("Websocket server listening on port %d", WEBSOCKET_PORT);

  }

  public static void main(String[] args) {
    new DC4Server().start();

  }

}
