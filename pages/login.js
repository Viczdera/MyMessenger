import React, { useContext, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import appIcon from "../public/messageapp.svg";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { LoginCall } from "./api/apiCalls";
import Router from "next/router"
import { DataContext } from "../context/authContext";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  form {
    width: 80%;
    display: flex;
    padding: 10%;
    flex-direction: column;
    align-items: center;
    background: whitesmoke;
    input,button {
      margin: 20px 0px 0px 0px;
    }
    input {
      margin: 20px 0px 0px 0px;
      width: 50%;
    }
    button{
      width: 100px;
      height: 30px;
    }
  }
`;

function Login(props) {

  
  
 const email=useRef();
  const password= useRef();
  const {user,isFetching, error, dispatch}= useContext(DataContext);

  const clicked = (e) => {
    e.preventDefault();
    LoginCall({email: email.current.value, password: password.current.value},dispatch);
    
  };
  if (user){
    Router.push("/")
  }

  return (
    <>
      <Navbar/>
      <Container>
        <form>
          <Image src={appIcon} alt="appicon" width="100px" height="100px" />
          <h3>LOGIN</h3>
          <input placeholder="Enter your email" type="email" ref={email} />
          <input placeholder="Enter your password"  type="password" ref={password}/>
          <button onClick={clicked} >{isFetching? "Loading":"LogIn"}</button>

          <h6>
            Don't have an account?{" "}
            <Link href="/signup">
              <a>Signup</a>
            </Link>{" "}
          </h6>
        </form>
      </Container>
    </>
  );
}

export default Login;
