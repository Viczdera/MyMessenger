import React from "react";

import styled from "styled-components";

const Chatcontainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .normal {
    flex-direction: row;
  }
  .myMessage {
    flex-direction: row-reverse;
  }
  .myMessage,
  .normal {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  .messageText {
    margin-right: 10px;
  }
  .myText {
    margin-left: 10px;
  }
  .messageText,
  .myText {
    width: 70%;
  }
  .timestamp {
    display: flex;
    justify-content: center;
    width: 30%;
    height: fit-content;
    
    span{
      background: #fafafa;
      font-size: 12px;
      padding: 0 10px 0 10px;
      color:rgba(0, 0, 0, 0.38);

    }
    
  }
`;
function TheChat({ mine }) {
  return (
    <Chatcontainer>
      <div className={mine ? "myMessage" : "normal"}>
        <div className={mine ? "myText" : "messageText"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel sagittis
          elementum turpis eleifend pharetra, arcu, tempor in.
        </div>
        <div className="timestamp">
          <span>02/01/21    08:35pm</span>
        </div>
      </div>
    </Chatcontainer>
  );
}

export default TheChat;
