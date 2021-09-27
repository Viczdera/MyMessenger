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
import Searchbar from "./Searchbar";

const ChatBoxNav = styled.div`
  height: 8%;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: #589cafff;
  position: relative;
  .userPic {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border: solid;
    border-radius: 50%;
    display: flex;
    align-items: center;
    margin-right: 4px;
    margin-left: 10px;
    position: absolute;
    right: 2%;
  }
`;
export const route = "api/";

function AdminMessenger() {
  const { user ,dispatch} = useContext(DataContext);
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

  //onlineUsers
  const [onlineUsers, setOnlineUsers]=useState(null)

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
    // socket.current = io("https://quiet-cove-52851.herokuapp.com/");
    socket.current = io("http://localhost:8000");
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
      setOnlineUsers(users)
      console.log(users)
      
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

  //signOut
  const signOut = () => {
    dispatch({type:"LOGOUT"})
    localStorage.removeItem("user")
  };

  return (
    <>
      <div className="messenger">
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
                      onlineUsers={onlineUsers}
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

              <div onClick={signOut}>
                SignOut
              </div>
            </SidebarFooter>
          </ProSidebar>
        </div>

        <div className="chatbox">
          <ChatBoxNav>
            <div className="userPic"></div>
            <Searchbar convo={conversations} />
          </ChatBoxNav>

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
                <Send />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminMessenger;
