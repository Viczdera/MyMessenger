import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Conversation from "./Conversation";
import TheChat from "./TheChat";
import axios from "axios";
import Navbar from "./Navbar";
import { DataContext } from "../context/authContext";
import { LowPriority } from "@material-ui/icons";

const Messenger = styled.div`
  height: calc(100vh - 70px);
  display: flex;

  .menu {
    background-color: #320234;
    color: #fff;
    width: 30%;
    min-width: 118px;
    .convoBtnClicked {
      background: white;
    }
  }
  .chatbox {
    background-color: #fff;
    width: 70%;
    padding: 5px;
    padding-bottom: 20px;

    .chatboxTop {
      height: 90%;
      display: flex;
      flex-direction: column;
      min-width: 202px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
      padding: 20px;
      padding-bottom: 10px;
      .openChat {
        text-align: center;
        color: #ffaf38;
        font-size: 50px;
      }
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
  const { user } = useContext(DataContext);
  const [conversations, setconversation] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  //loading 
  const [loading, setLoading] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(async () => {
    try {
      const res = await axios.get(
        route + `conversations/users/${user.data._id}`
      );
      // console.log(res.data.data);
      setconversation(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [user.data._id]);

  //active chat
  // console.log(activeChat);

  //and get messages of active chat
  useEffect(() => {
    const getmessages = async () => {
      try {
        const res = await axios.get(route + "messages/" + activeChat?._id);
       //console.log(res.data.data)
        setMessage(res.data.data);
        setLoading(false);


      } catch (err) {
        console.log(err);
      }
    };
    getmessages();
  }, [activeChat]);

 console.log(message)

  return (
    <>
      <Navbar />
      <Messenger>
        <div className="menu">
          {conversations.map((c) => {
            return (
              <div
                className={onclick ? "convoBtnClicked" : "convoBtn"}
                onClick={() => {
                  setActiveChat(c);
                  setLoading(true)
                }}
              >
                <Conversation convo={c} currentUser={user.data} />
              </div>
            );
          })}
        </div>
        <div className="chatbox">
          <div className="chatboxTop">
            {activeChat ? (
              loading ? (
                <span className="openChat">Loading</span>
              ) : (
                <>
                  {message?.length === 0 ? (
                    <span className="openChat">No Messages</span>
                  ) : (
                    <>
                      {message.map((m) => {
                        return (
                          <TheChat chat={m} mine={m.sender === user.data._id} />
                        );
                      })}
                    </>
                  )}
                </>
              )
            ) : (
              <span className="openChat">Open Chat</span>
            )}
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
