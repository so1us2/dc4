

export default class AppManager {

  constructor() {
    this.socket = new DC4WebSocket();
  }

  manageState = (component) => {
    this.setState = component.setState;
  }

  loadPage = (page) => {
    this.setState({currentPage: page});
  }
}
