package dc4.service;

import ox.Log;

public class TestService {

  private static final TestService instance = new TestService();

  public static TestService get() {
    return instance;
  }

  private TestService() {

  }

  public void handle(int count) {
    Log.debug("Test handle() method with count: " + count);
    for (int i = 0; i < 100_000_000; i++) {
      double a = Math.random();
    }
    Log.debug("Test handle() method with count %d completed.", count);
  }
}
