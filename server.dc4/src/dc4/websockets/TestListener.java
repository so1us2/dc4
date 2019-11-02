package dc4.websockets;

import bowser.websocket.ClientSocket;
import dc4.service.TestService;
import ox.Json;

public class TestListener extends WebSocketListener {

  private static final TestListener instance = new TestListener();

  private volatile int count = 0;

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
