import React from 'react';
import ReactDOM from 'react-dom';
import Alt from './flux/alt';

window.React = React;
window.ReactDOM = ReactDOM;
window.Alt = Alt;

import Chat from './components/chat-alt';
registerComponent('Chat', Chat);

import ChatReceiver from './subscribers/chat-receiver'; // import vs require. With says better that creating subscriptions is enough.
