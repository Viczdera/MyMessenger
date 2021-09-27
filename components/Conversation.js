import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../context/authContext";
import { route } from "./AdminMessenger";
import Image from "next/image";
import { Avatar } from "@material-ui/core";

const ContactDiv = styled.div`
  padding-left: 10px;
  margin-top: 10px;
  .wrapper {
    display: flex;
    align-items: center;
    height: 60px;
    cursor: pointer;
    color: #050714;

    :hover {
      color: #fff;
      border-bottom-left-radius: 30px;
      border-top-left-radius: 30px;
      background-color: #050714;
    }
  }

  .userPic {
    min-width: 40px;
    width: 50px;
    height: 50px;
    border: solid;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    margin-left: 10px;
  }
  .online {
    background: green;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-right: 10px;
    line-height: 6px;
  }
  .offline {
    background: red;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-right: 10px;
    line-height: 6px;
  }
  .convoName {
    font-weight: 500;
  }
`;
function Conversation({ convo, currentUser, collapsed, mediaq, onlineUsers }) {
  const [user, setUser] = useState(null);
  const [online, setonline]= useState(null)

  useEffect(async () => {
    //filter friend
    const friendId = convo.members.find((m) => m !== currentUser._id);
    // console.log(friendId);
    //get friend
    try {
      const res = await axios(route + `users/${friendId}`);
      // console.log(res.data.data);
      setUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [convo, currentUser]);

 



  return (
    <ContactDiv>
      <div className="wrapper">
        <div className="userPic">
          <Avatar/>
        </div>
      {/*<div
          className={online? "online" : "offline"}
        /> */}  
        {mediaq ? (
          <>
            {" "}
            {collapsed ? (
              ""
            ) : (
              <span className="convoName" key={convo._id}>
                {convo ? `${user ? `${user.name}` : "....."}` : ""}
              </span>
            )}
          </>
        ) : (
          <>
            {" "}
            {collapsed ? (
              <span className="convoName" key={convo._id}>
                {convo ? `${user ? `${user.name}` : "....."}` : ""}
              </span>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </ContactDiv>
  );
}

export default Conversation;
