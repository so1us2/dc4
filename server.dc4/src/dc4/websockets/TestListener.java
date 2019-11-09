package dc4.websockets;

import dc4.service.TestService;

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
  protected void handle(WebSocketMessage message) {
    testService.handle(++count);
  }

}
