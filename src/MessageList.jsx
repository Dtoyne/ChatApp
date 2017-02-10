import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  _messageList() {
      return (
        <div id="message-list">
          { this.props.messages.map((message) => {
              return ( <Message message={ message } key={ message.id } /> )
            }
          )}
        </div>
      )
    }

  render() {
    console.log("Rendering MessageList");
    return (
      this._messageList()
    );
  }
}

export default MessageList;
