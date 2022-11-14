import React, { Component } from "react";
import "./chatCSS.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";

export default class ChatBody extends Component {
  render() {
    return (
      <div className="mainChatbody">
        <ChatList />
        <ChatContent />
      </div>
    );
  }
}