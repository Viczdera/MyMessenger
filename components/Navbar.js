import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { DataContext } from "../context/authContext";
import Router from "next/router";
import Image from "next/image";
import appicon1 from "../public/appicon1.svg";
import loginIcon from "../public/enter.svg";
import axios from "axios";
import { ExitToApp, ExitToAppRounded } from "@material-ui/icons";

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
      <Image src={appicon1} alt="appicon" width="30px" height="30px"  />
      <Link href="/">
        <a style={{fontSize:"20px"}} className="logolink">NeXtChat</a>
      </Link>
      

      <div className="mheaderNav">
        <div className="mheaderOption">
          {user ? (
            <button onClick={signOut}>SignOut</button>
          ) : (
            <button onClick={signIn}> <Image src={loginIcon} alt="loginicon" width="30px" height="30px"  /></button>
          )}
          {/*<a className={"hLink" + isActive("/signin")}>
            </a>*/}
            
        </div>
        {user? <span>Welcome {user.data.name}</span>:""}
       
      </div>

      {/*style*/}
      <style jsx>{`
       
      `}</style>
    </div>
  );
}

export default Navbar;
