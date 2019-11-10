

export default class PlayHumanPageManager {

  constructor(appManager) {
    this.socket = appManager.socket;
    this.socket.listen("search", "token", this.getSearchToken);
    this.socket.listen("matchmaking", "accept", this.clientAccept);
    this.loadHomePage = () => appManager.loadPage("home");
    this.name = "";
  }

  manageState = component => {
    this.setState = component.setState;
  };

  initializeState = () => {
    this.setState({
      searching: false,
      error: false,
      showAcceptPanel: false
    });
  };

  getSearchToken = data => {
    this.token = data.token;
    console.log("Received and stored search token " + this.token);
  }

  search = () => {
    if (!this.name) {
      this.setState({error:true});
      return;
    }
    this.setState({searching: true, error:false});
    this.socket.send({
      channel: "matchmaking",
      command: "search",
      data: {
        name: this.name
      }
    });
  };

  setName = name => {
    this.name = name;
  }

  clientAccept = (data) => {
    this.setState({awaitingAccept: true});
    return;
  };

  cancelSearch = () => {
    this.setState({searching: false});
    this.socket.send({
      channel: "matchmaking",
      command: "cancelSearch",
      data: {
        token: this.token
      }
    });
  }
}
