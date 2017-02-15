import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      counter: 0,
      messages: [],
      colour: ''
    };
  }

  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:5000");

    console.log("componentDidMount <App />");

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      let data = (JSON.parse(event.data))
      console.log("onmessage")
      console.log(data)
      console.log(this.state.messages)
      switch (data.type) {
        case 'incomingMessage':
          this.setState({messages: this.state.messages.concat(data)});
          break;
        case 'incomingNotification':
          this.setState({messages: this.state.messages.concat(data)});
          break;
        case 'counter':
          this.setState({counter: data.count});
          break;
        case 'colour':
          this.setState({colour: data.colour})
          break;
        default:
          throw new Error('Unknown event' + data.type);
      }
      console.log(this.state.messages)
    }
  }

  newMessage = (event) => {
    if(event.charCode === 13) {
      let trimmedString = event.target.value.replace(/^\s+|\s+$/g,'')
      if(trimmedString){
        const newMessage = {type: "postMessage", colour: this.state.colour, username: this.state.currentUser.name, content: event.target.value}
        this.socket.send(JSON.stringify(newMessage))
      }
    }
  }

  username = (event) => {
    if(event.charCode === 13 || event.charCode === 9) {
      if(event.target.value != this.state.currentUser.name && event.target.value){
        let trimmedName = event.target.value.replace(/^\s+|\s+$/g,'')
        let newName={name: trimmedName}
        !(event.target.value === '') ? this.setState({currentUser: newName}):this.setState({currentUser: {name:'Anonymous'}})
        const newMessage = {type: "postNotification", content: `${this.state.currentUser.name} has changed their name to ${newName.name}`};
        this.socket.send(JSON.stringify(newMessage))
      }
    }
  }

  render() {
    console.log("Rendering <App/>");
    console.log("App: ", this.state.messages)
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <p className="counter">{ this.state.counter } users online</p>
        </nav>
        <MessageList messages = { this.state.messages }/>
        <ChatBar currentUser = { this.state.currentUser }
                 newMessage = { this.newMessage }
                 username = { this.username }/>
      </div>
    );
  }
}
export default App;
