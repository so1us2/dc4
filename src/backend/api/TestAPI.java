package backend.api;

import bowser.Controller;
import bowser.Handler;
import ox.Json;

public class TestAPI extends Controller {

  @Override
  public void init() {
    route("GET", "/api/test").to(apiTest);
    route("POST", "/api/test").to(apiTest);
  }

  private final Handler apiTest = (request, response) -> {
    response.write(Json.object().with("a", 42));
  };

}
