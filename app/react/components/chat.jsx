import React from 'react';
import ChatEmiter from './../subscribers/chat-emitter';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);

    this.state = {
      messages: [],
      message: '',
      user: '',
    };

    App.cable.subscriptions.create('RoomChannel', {
      received: this.onReceive,
    })
  }

  onReceive(data) {
    const messages = this.state.messages;
    let message = data.message;
    message.type = this.state.user === message.user ? 'sent' : 'received';
    messages.push(message)
    this.setState({ messages: messages });
  }

  onMessageChange(e) {
    this.setState({message: e.target.value});
  }

  onNameChange(e) {
    this.setState({user: e.target.value});
  }

  onSend(e) {
    e.preventDefault();
    const message = {
      body: this.state.message,
      user: this.state.user,
    }
    ChatEmiter.speak(message);
    this.setState({message: ''});
  }

  render() {
    const list = this.state.messages.map((message) => {
      return (
        <div>
          {message.type === 'sent' ? <p><b>you:</b> {message.body}</p> : <p><b>{message.user}</b>: {message.body}</p>}
        </div>
      );
    });

    return (
      <div>
        <input onChange={this.onNameChange} placeholder="choose nickname" ></input>
        {list}
        <hr/>
        <div>
          <form onSubmit={this.onSend}>
            <input placeholder="say something..." value={this.state.message} onChange={this.onMessageChange} />
          </form>
        </div>
      </div>
    );
  }
}
