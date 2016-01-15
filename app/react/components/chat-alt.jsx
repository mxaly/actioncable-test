import React from 'react';
import ChatStore from './../flux/store';
import ChatActions from './../flux/actions';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.state = ChatStore.getState();
  }

  componentDidMount() {
    ChatStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ChatStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(ChatStore.getState());
  }

  onMessageChange(e) {
    this.setState({message: e.target.value});
  }

  onNameChange(e) {
    ChatActions.setCurrentUser(e.target.value);
  }

  onSendClick(e) {
    e.preventDefault();
    const message = {
      body: this.state.message,
      user: this.state.user,
    }
    ChatActions.speak(message);
    this.setState({message: ''});
  }

  render() {
    const list = this.state.messages.map((message) => {
      return (
        <div>
          {message.type === 'sent' ? <div>{message.body}</div> : <div>{message.user} says: {message.body}</div>}
        </div>
      );
    });

    return (
      <div>
        <input onChange={this.onNameChange} placeholder="choose nickname" ></input>
        {list}
        <hr/>
        <div>
          <form onSubmit={this.onSendClick}>
            <input placeholder="say something..." value={this.state.message} onChange={this.onMessageChange} />
          </form>
        </div>
      </div>
    );
  }
}
