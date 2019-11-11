import DC4WebSocket from '../../websockets/DC4WebSocket';

export default class AppManager {

  constructor() {
    this.socket = new DC4WebSocket();
  }

  manageState = (component) => {
    this.component = component;
  }

  getInitialState = () => {return {currentPage: "home"}};

  loadPage = (page) => {
    this.setState({currentPage: page});
  }
}
