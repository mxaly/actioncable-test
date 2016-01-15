import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;

import Chat from './components/chat';
registerComponent('Chat', Chat);

import ChatReceiver from './subscribers/chat-receiver'; // import vs require. With says better that creating subscriptions is enough.
