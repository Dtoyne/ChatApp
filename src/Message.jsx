import React, {Component} from 'react';

class Message extends Component {

  render() {
    if(this.props.message.type==='incomingMessage'){
      return(
        <div className="message" >
          <span className="username" style={{color: this.props.message.colour }}>{ this.props.message.username }</span>
          <span className="content">{ this.props.message.content }</span>
        </div>
      )
    }

    else if(this.props.message.type==='incomingNotification'){
      return  (<div className="message system" >
                { this.props.message.content }
               </div>)
    }
  }
}
export default Message;
