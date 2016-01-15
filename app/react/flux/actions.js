import alt from './alt';
import ChatEmiter from './../subscribers/chat-emitter';

class Actions {
  constructor() {
    this.generateActions('receive', 'setCurrentUser');
  }

  speak(message) {
    ChatEmiter.speak(message);
  }
}

export default alt.createActions(Actions);
