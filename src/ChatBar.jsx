import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("rending ChatBar");
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)" value={this.props.currentUser.name}/>
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;
