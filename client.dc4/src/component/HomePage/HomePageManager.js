export default class HomePageManager {

  constructor(appManager) {
    this.socket = appManager.socket;
    this.loadPlayBotPage = () => appManager.loadPage("playBot");
    this.loadPlayHumanPage = () => appManager.loadPage("playHuman");
  }

  manageState = (component) => {
    this.setState = component.setState;
  }

  sendTest = () => {
    this.socket.send({
      channel: "test",
      command: "test",
      data: {payload: "payload 1"}
    });
  }
}
