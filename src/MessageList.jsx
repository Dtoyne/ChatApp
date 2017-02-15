import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    console.log("MessageList: ", this.props.messages)
    return (
      <div id="message-list">
        { this.props.messages.map((message) => {
            return <Message message={ message }
                            key={ message.id }
                            />
        }) }
      </div>
    );
  }
}
export default MessageList;
