import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Conversation from "./Conversation";
import TheChat from "./TheChat";
import axios from "axios";
import Navbar from "./Navbar";
import { DataContext } from "../context/authContext";

const Messenger = styled.div`
  height: calc(100vh - 70px);
  display: flex;

  .menu {
    background-color: #320234;
    color: #fff;
    width: 30%;
  }
  .chatbox {
    background-color: #fff;
    width: 70%;
    padding: 5px;
    padding-bottom: 20px;

    .chatboxTop {
      height: 90%;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
      padding: 20px;
      padding-bottom: 10px;
    }
    .chatboxBottom {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      align-items: center;

      .inputText {
        height: 10px;
        background: #fafafa;
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-sizing: border-box;

        padding: 10px;
      }
      .chatButton {
        background: #ffaf38;
        border: none;
        color: #fff;
        padding: 10px;
        font-size: 12px;
      }
    }
  }
  .menu,
  .chatboxTop {
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: #320234;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.38);
    }
  }
`;
export const route = "api/";

function AdminMessenger(props) {
  /*useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res.data);
        setusers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);*/

  const {user}=useContext(DataContext);

  const [conversations, setconversation] = useState([]);

  useEffect(async () => {
    try {
      const res = await axios.get(route + `conversations/users/${user.data._id}`);
      console.log(res.data.data)
      setconversation(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [user.data._id]);
  return (
    <>
    <Navbar/>
    <Messenger>
      <div className="menu">

        {conversations.map((c)=>{
          return(
          <Conversation convo={c} currentUser={user.data}  />)
        })}
        
      </div>
      <div className="chatbox">
        <div className="chatboxTop">
          <TheChat />
          <TheChat />
          <TheChat mine={true} />
          <TheChat />
          <TheChat mine={true} />
          <TheChat />
          <TheChat mine={true} />
        </div>
        <div className="chatboxBottom">
          <textarea
            className="inputText"
            placeholder="type messages"
          ></textarea>
          <button className="chatButton">SEND MESSAGE</button>
        </div>
      </div>
    </Messenger>
    </>
  );
}

export default AdminMessenger;
