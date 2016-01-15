import ChartActions from './../flux/actions'

export default App.cable.subscriptions.create('RoomChannel', {
  received(data) {
    ChartActions.receive(data.message)
  }
})
