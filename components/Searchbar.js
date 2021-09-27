import { Search } from "@material-ui/icons";
import axios from "axios";
import router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/authContext";
import { route } from "./AdminMessenger";

function Searchbar({ convo }) {
  const { user } = useContext(DataContext);
  const [allUsers, setAllUsers] = useState([]);

  const [searchList, setSearchList] = useState("");

  useEffect(async () => {
    try {
      const res = await axios.get(route + `users`);
      console.log(res.data.data);
      setAllUsers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [allUsers.name]);

  //new conversation
  const [newFriend, setnewFriend] = useState([]);

   //filter newFriend Id
   const newFriendId= allUsers.find((u)=>
      (newFriend===u.name )?u._id:""
   )
   //console.log(newFriendId._id)

  const addNew = async (e) => {
   // e.preventDefault();
    const newConverstion = {
      senderId: user.data._id,
      receiverId: newFriendId._id,
    };

    //filter receiver id
    

    if (newFriend !== "") {
      try {
        const res = await axios.post(route + "conversations", newConverstion);
        //add to the newCOnversation
        setnewFriend([convo, res.data]);
        //empty textbox after
        setnewFriend("");

        console.log(newFriend);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="searchBar">
      <form action="/" method="get" onSubmit={addNew}>
        <div className="searchbar">
          {" "}
          <i>
            {" "}
            <Search />
          </i>
          <input
            list="userslist"
            autoComplete="off"
            type="search"
            id="searchorder"
            placeholder="search for friends"
            name="s"
            onChange={(e) => {
              setSearchList(e.target.value);
              setnewFriend(e.target.value);
            }}
            value={newFriend}
          />
          <datalist id="userslist">
            {allUsers
              .filter((u) => {
                if (searchList == "") {
                  return u;
                } else if (
                  u.name.toLowerCase().includes(searchList.toLowerCase())
                ) {
                  return u;
                }
              })
              .map((u) => {
                return <option key={u._id} value={u.name} />;
              })}
          </datalist>
        </div>
        {/*<button><Search/></button>*/}
      </form>
    </div>
  );
}
export default Searchbar;
