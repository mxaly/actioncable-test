export default App.cable.subscriptions.create('RoomChannel', {
  speak(message) {
    this.perform('speak', {message: message});
  }
})
