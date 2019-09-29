package backend.api;

import bowser.WebServer;
import ox.Log;

public class DC4Server {

  private static final int PORT = 1501;


  public void start() {
    Log.debug("Starting the server boys and girls!");
    WebServer webServer = new WebServer("DC4", PORT, true).controller(new TestAPI()).start();
    Log.debug("Server running on port %d", PORT);
  }

  public static void main(String[] args) {
    new DC4Server().start();
  }

}
