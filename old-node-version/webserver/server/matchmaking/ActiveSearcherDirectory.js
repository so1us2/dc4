import ActiveSearcher from './ActiveSearcher';

export default class ActiveSearcherDirectory {
  addSearcher(client) {
    console.log("Checking to see if ", client.id, " already exists.");
    for (var i = 0; i < this.activeSearchers.length; i++) {
      console.log("Checking against ", this.activeSearchers[i].client.id);
      if (this.activeSearchers[i].client.id == client.id) {
        console.log("ID already exists in directory.  Not adding to search queue.");
        return;
      }
    }
    this.activeSearchers.push(new ActiveSearcher(client));
  }

  removeSearcher(client) {
    console.log("Removing searcher ", client.id);
    for (var i = 0; i < this.activeSearchers.length; i++) {
      console.log("Should I remove ", this.activeSearchers[i].client.id, "?");
      if (this.activeSearchers[i].client.id == client.id) {
        this.activeSearchers.splice(i, 1);
      }
    }
  }

  hasTwo() {
    return this.activeSearchers.length >= 2;
  }

  getTwo() {
    return [this.activeSearchers.shift(), this.activeSearchers.shift()];
  }

  constructor() {
    this.activeSearchers = [];
  }
}
