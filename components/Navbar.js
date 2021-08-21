import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { DataContext } from "../context/authContext";
import Router from "next/router";
import axios from "axios";

function Navbar() {
  //active page routing
  const router = useRouter();
  const isActive = (r) => {
    if (r == router.pathname) {
      return "active";
    } else {
      return "";
    }
  };

  //search functionality

  //user
  const { user, dispatch } = useContext(DataContext);

  const signOut = () => {
    dispatch({type:"LOGOUT"})
  };
  const signIn = () => {
    Router.push("/login");
  };
  
  
  return (
    <div className="mheader">
      <Link href="/">
        <a className="logolink">NeXtChat</a>
      </Link>

      <div className="mheaderNav">
        <div className="mheaderOption">
          {user ? (
            <button onClick={signOut}>SignOut</button>
          ) : (
            <button onClick={signIn}>SignIn</button>
          )}
          {/*<a className={"hLink" + isActive("/signin")}>
            </a>*/}
            
        </div>
        {user? <span>Welcome {user.data.name}</span>:""}
      </div>

      {/*style*/}
      <style jsx>{`
        .mheader {
          padding: 10px;
          height: 60px;
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100; /*always above all components*/
          background-color: #fff;
          border-bottom: 2px solid grey;
        }
        .logolink {
          color: #ffaf38;
          margin-left: 3%;
          margin-right: 5%;
        }
        .headerLogo {
          width: 50px;
          height: 50px;
          object-fit: contain; /*keeps aspect ratio */
          margin: 0 20px;
          margin-top: 10px;
        }
        .hLink {
          width: fit-content;
          height: fit-content;
          color: #ffaf38;
        }
        .hOLineone,
        .hOLinetwo {
          color: white;
        }
        .mheaderSearch {
          display: flex;
          flex: 1; /*stretching the search box*/
          border: solid grey;

          border-radius: 20px;
        }
        .headerSearchinput {
          width: 100%;
          background: grey;
        }
        .headerSearchIcon {
          color: #000;
          height: 20px;
          background-color: white;
        }

        .mheaderNav {
          display: flex;
          margin-left: 5%;
          margin-right: 2%;
        }
        .mheaderOption {
          display: flex;
          margin-left: 10px;
          margin-right: 10px;
          flex-direction: column;
        }
        .hOLineone {
          font-size: 10px;
        }
        .hOLinetwo {
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }
        .headerOptionbasket {
          display: flex;
          align-items: center;
          background-color: rgb(226, 79, 79);
          color: #fff;
          margin-right: 10px;
          padding: 4px;
        }
        .headerShoppingbasket {
          color: #fff;
          height: 30px;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default Navbar;
