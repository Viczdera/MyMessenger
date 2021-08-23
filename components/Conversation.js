import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../context/authContext";
import { route } from "./AdminMessenger";

const ContactDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  :hover {
    color: #320234;
    background-color: #fff;
  }

  .userPic {
    width: 40px;
    height: 40px;
    border: solid;
    border-radius: 50%;
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  .convoName {
    font-weight: 500;
  }
`;
function Conversation({ convo, currentUser }) {
  const [user, setUser] = useState(null);

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
      <div className="userPic">
        <FontAwesomeIcon style={{ margin: " 0 auto" }} icon={faUser} />
      </div>

      <span className="convoName">
        {convo ? `${user ? `${user.name}` : "....."}` : ""}
      </span>
    </ContactDiv>
  );
}

export default Conversation;
