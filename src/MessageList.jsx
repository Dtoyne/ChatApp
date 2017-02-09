import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("rending MessageList");
    return (
      <div id="message-list">
        { this.props.messages.map( (message, i) => {
            return (
              <Message message={message} key={i} />
            )
          }
        )}
      </div>
    );
  }
}

export default MessageList;
