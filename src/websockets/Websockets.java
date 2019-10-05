package websockets;

import static ox.util.Utils.propagate;

import java.net.ServerSocket;

import backend.api.DC4Server;
import bowser.websocket.WebSocketServer;

public class Websockets {

  private final WebSocketServer socketServer;
  private final ServerSocket serverSocket;

  public Websockets() {
    socketServer = new WebSocketServer(DC4Server.WEBSOCKET_PORT);
    try {
      serverSocket = new ServerSocket(DC4Server.WEBSOCKET_PORT);
    } catch (Exception e) {
      throw propagate(e);
    }
  }
}
