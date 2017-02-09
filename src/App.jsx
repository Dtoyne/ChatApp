import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;
  }

  sendMessage(event) {
    if (event.key === 'Enter') {
      const newMessage = {
        type: "postMessage",
        usrname: this.state.currentUser.name,
        content: event.target.value
      }
    }
  }

  updateUser(event) {
    if (event.key === 'Enter') {
      event.target.value.trim() === "" ? name = "Anonymous" : name = event.target.value;
    }
  }

  render() {
    console.log("rending App");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;
