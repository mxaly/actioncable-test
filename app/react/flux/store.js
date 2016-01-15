import actions from './actions';
import alt from './alt';

class Store {
  constructor() {
    this.state = {
      messages: [],
    };

    this.bindListeners({
      onMessageReceived: actions.receive,
      onSetCurrentUser: actions.setCurrentUser,
    });
  }

  onMessageReceived(message) {
    const messages = this.state.messages;
    message.type = this.state.user === message.user ? 'sent' : 'received';
    messages.push(message)
    this.setState({ messages: messages });
    this.emitChange();
  }

  onSetCurrentUser(name) {
    this.state.user = name;
    this.emitChange();
  }
}

export default alt.createStore(Store, 'ChatStore');
