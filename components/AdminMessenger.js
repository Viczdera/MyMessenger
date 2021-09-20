import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Conversation from "./Conversation";
import TheChat from "./TheChat";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@material-ui/core";
import {
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  ProSidebar,
} from "react-pro-sidebar";
import { DataContext } from "../context/authContext";
import { io } from "socket.io-client";

import appicon1 from "../public/appicon1.svg";
import { Add, Cancel, Send } from "@material-ui/icons";

const ChatBoxNav = styled.div`
  height: 8%;
  width: 100%;
  border-radius: 10px;
  background: #589cafff;
`;

const Messenger = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  display: flex;
  overflow-x: scroll;
  button {
    border: 0px;
    cursor: pointer;
  }
  .chatbox {
    background: url("../assets/bkg1.svg");
    width: 100%;
    padding: 5px;

    padding-bottom: 20px;

    .chatboxTop {
      margin-top: 10px;
      height: 85%;
      display: flex;
      flex-direction: column;
      min-width: 202px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
      padding: 20px;
      padding-bottom: 10px;
      border-radius: 10px;

      .openChat {
        text-align: center;
        color: #ffaf38;
        font-size: 50px;
      }
    }
    .chatboxBottom {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      form {
        display: flex;
        width: 100%;
        height: 40px;
        margin-top: 12px;
      }
      input,
      .chatButton {
        padding: 10px;
        font-size: 12px;
        margin: 0px 10px 0px 0px;
      }
      input {
        width: 100%;
        border-radius:10px;
      }

      .inputText {
        height: 10px;
        background: #fafafa;
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-sizing: border-box;

        padding: 10px;
      }
      .chatButton {
        background: #050714;
        cursor: pointer;
        border: none;
        color: #fff;
        display: flex;
        align-items: center;
      }
    }
  }
  .chatboxTop {
    overflow-x: hidden;
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

function AdminMessenger() {
  const { user } = useContext(DataContext);
  const [conversations, setconversation] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  //add new friend
  const [addNew, setAddNew] = useState(false);

  //loading
  const [loading, setLoading] = useState(true);
  //messafe and new message
  const [message, setMessage] = useState([]);
  const [newMessages, setNewMessages] = useState();
  //sockets
  const socket = useRef();
  const [RTMessage, setRTMessage] = useState(null);

  const scrollRefCurrentM = useRef();

  const [collapsed, setCollapsed] = useState(true);

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
  }, [user?.data._id]);

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

  //console.log(message);
  //console.log(activeChat)

  //new messages

  const submitMessage = async (e) => {
    e.preventDefault();
    const newMessage = {
      conversationId: activeChat._id,
      sender: user.data._id,
      text: newMessages,
    };
    //filter receiver id
    const receiverId = activeChat.members.find(
      (member) => member !== user.data._id
    );
    console.log(receiverId);

    if (newMessages !== "") {
      socket.current.emit("sendMessage", {
        senderId: user.data._id,
        receiverId,
        text: newMessages,
      });
      try {
        const res = await axios.post(route + "messages", newMessage);
        //add to the messages
        setNewMessages([...message, res.data.data]);
        //empty textbox after
        setNewMessages("");

        console.log(newMessages);
      } catch (err) {
        console.log(err);
      }
    }
  };
  //socket
  useEffect(() => {
    socket.current = io("https://quiet-cove-52851.herokuapp.com/");
    socket.current.on("getMessage", (d) => {
      setRTMessage({
        sender: d.senderId,
        text: d.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?.data._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]); //user can change

  //update new real time message
  useEffect(() => {
    RTMessage &&
      activeChat?.members.includes(RTMessage.sender) &&
      setMessage((previousC) => [...previousC, RTMessage]);
  }, [RTMessage, activeChat]);

  //scroll ref
  useEffect(() => {
    scrollRefCurrentM.current?.scrollIntoView();
  }, [message]);

  const mediaq = useMediaQuery("(max-width:700px");

  console.log(addNew);

  return (
    <>
      <Messenger>
        <div className="sideMenu">
          <ProSidebar
            className="Prosidebar"
            collapsed={mediaq ? collapsed : !collapsed}
            width={mediaq ? "250px" : "300px"}
            collapsedWidth={mediaq ? "80px" : "100px"}
          >
            <SidebarHeader>
              <span style={{ minWidth: "30px" }}>
                <Image
                  src={appicon1}
                  alt="appicon"
                  width="30px"
                  height="30px"
                />
              </span>
              {mediaq ? (
                <>
                  {" "}
                  {collapsed ? (
                    ""
                  ) : (
                    <Link href="/">
                      <a style={{ fontSize: "20px" }} className="logolink">
                        NeXtChat
                      </a>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  {" "}
                  {collapsed ? (
                    <Link href="/">
                      <a style={{ fontSize: "20px" }} className="logolink">
                        NeXtChat
                      </a>
                    </Link>
                  ) : (
                    ""
                  )}
                </>
              )}
            </SidebarHeader>
            <Menu>
              <div className={addNew ? "showform" : "hideform"}>
                <div className="addUserDiv">
                  Hello, {user.data.name}
                  {addNew ? (
                    <button
                      onClick={() => {
                        setAddNew(false);
                      }}
                      style={{ background: "none" }}
                    >
                      <Cancel />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setAddNew(true);
                      }}
                      style={{ background: "none" }}
                    >
                      <Add />
                    </button>
                  )}
                </div>
                {addNew ? (
                  <form>
                    <input placeholder="enter contact's email" />
                    <button>Add</button>
                  </form>
                ) : (
                  ""
                )}
              </div>
            </Menu>

            <SidebarContent>
              {conversations.map((c) => {
                return (
                  <div
                    className={onclick ? "convoBtnClicked" : "convoBtn"}
                    onClick={() => {
                      setLoading(true);
                      setActiveChat(c);
                      // message?setLoading(false):""
                    }}
                    key={c._id}
                  >
                    <Conversation
                      convo={c}
                      currentUser={user.data}
                      collapsed={collapsed}
                      mediaq={mediaq}
                    />
                  </div>
                );
              })}
            </SidebarContent>

            <SidebarFooter>
              {/*   <div > <Switch type="checkbox" checked={collapsed} onChange={handleCollapsed}/>
                {mediaq?"collapsed":"expand"}
              </div>*/}
              {mediaq ? (
                <>
                  {collapsed ? (
                    <button
                      onClick={() => {
                        setCollapsed(false);
                      }}
                    >
                      exp
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCollapsed(true);
                      }}
                    >
                      collape
                    </button>
                  )}
                </>
              ) : (
                <>
                  {" "}
                  {collapsed ? (
                    <button
                      onClick={() => {
                        setCollapsed(false);
                      }}
                    >
                      collape
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCollapsed(true);
                      }}
                    >
                      exp
                    </button>
                  )}
                </>
              )}
            </SidebarFooter>
          </ProSidebar>
        </div>

        <div className="chatbox">
          <ChatBoxNav />

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
                          <div ref={scrollRefCurrentM} key={m._id}>
                            <TheChat
                              chat={m}
                              mine={m.sender === user.data._id}
                            />
                          </div>
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
            <form>
              <input
                type="text"
                onChange={(e) => {
                  setNewMessages(e.target.value);
                }}
                value={newMessages}
                required={true}
              ></input>
              <button onClick={submitMessage} className="chatButton">
                <Send/>
              </button>
            </form>
          </div>
        </div>

        {/*<div className="menu">
          {conversations.map((c) => {
            return (
              <div
                className={onclick ? "convoBtnClicked" : "convoBtn"}
                onClick={() => {
                  setLoading(true);
                  setActiveChat(c);
                  // message?setLoading(false):""
                }}
              >
                <Conversation convo={c} currentUser={user.data} />
              </div>
            );
          })}
        </div>
        
        
        





        
        
        
        */}
      </Messenger>
    </>
  );
}

export default AdminMessenger;
