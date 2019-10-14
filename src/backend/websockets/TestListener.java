package backend.websockets;

import backend.service.TestService;
import bowser.websocket.ClientSocket;
import ox.Json;

public class TestListener extends WebSocketListener {

  private static final TestListener instance = new TestListener();

  private int count = 0;

  private final TestService testService = TestService.get();

  public static TestListener get() {
    return instance;
  }

  private TestListener() {
    super("test");
  }

  @Override
  protected void handle(String command, Json data, ClientSocket socket) {
    testService.handle(++count);
  }

}
