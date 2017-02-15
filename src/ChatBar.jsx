import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input id="username"
               type="text"
               placeholder="Your Name (Optional)"
               onKeyPress={ this.props.username }
               />
        <input id="new-message"
               type="text"
               placeholder="Type a message and hit ENTER"
               onChange={() => { this.setState({text: event.target.value}) }}
               onKeyPress={ this.props.newMessage }
               />
      </footer>
    );
  }
}
export default ChatBar;
