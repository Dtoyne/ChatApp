import React, {Component} from 'react';

class Message extends Component{

  _incomingMessage() {
    const message = this.props.message.content;
    return(
      <div className="message">
        <span className="username">{ this.props.message.username }</span>
        <span className="content">{ message }</span>
      </div>
    );
  }

  _incomingNotification() {
    return(
      <div className="message system">
        {this.props.message.content}
      </div>
    )
  }

  render() {
    console.log("Rendering <Message/>");
    switch (this.props.message.type) {

      case "incomingMessage":
        return (this._incomingMessage())
        break;

      case "incomingNotification":
        return (this._incomingNotification())
        break;

      default:
        throw new Error("Unknown event type " + this.props.message.type);
    }
  }
}

export default Message;
