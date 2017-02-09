import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      input: ''
    }
  }

  render() {
    console.log("rendering ChatBar");

    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          onChange={ () => { this.setState( {input: event.target.value} )}}
          onKeyPress={ this.props.updateUser } />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onChange={ () => { this.setState( {input: event.target.value} )}}
          onKeyPress={ this.props.sendMessage } />

      </footer>
    );
  }
}

export default ChatBar;
