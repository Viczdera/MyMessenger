import React from "react";
import {format} from "timeago.js"
import styled from "styled-components";

const Chatcontainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  .myMessageCont,.friendMessageCont{
    display: flex;
    align-items: center;
    margin: 40px 0px 0px 40px;
    width: 100%;
  }
  .myMessageCont{
    display: flex;
    flex-direction: row-reverse;
    .myText{
      
    }
    .myTimestamp{
      display: flex;
      align-items: flex-end;
      justify-content: end;
      ;
    }
  }
  .friendMessageCont{
    display: flex;
    flex-direction: row;
    align-items:flex-start;
    .friendTimestamp{
      display: flex;
      align-self: center;
      
    justify-content: start;
      
      ;
    }     
  }
  .friendText,
  .myText {
    width: 250px;
  }
  .myTimestamp,.friendTimestamp {
    display: flex;
    width: 100px;
    height: fit-content;
    
    span{
      background: #fafafa;
      font-size: 12px;
      padding: 0 10px 0 10px;
      color:rgba(0, 0, 0, 0.38);

    }
    
  }
`;
function TheChat({ chat , mine }) {
  return (
    <Chatcontainer>
      <div className={mine ? "myMessageCont" : "friendMessageCont"}>
        <div key={chat._id} className={mine ? "myText" : "friendText"}>
         {chat.text}
        </div>
        <div className={mine ? "myTimestamp":"friendTimestamp"}>
          <span key={chat._id}>{format(chat.createdAt)}</span>
        </div>
      </div>
    </Chatcontainer>
  );
}

export default TheChat;
