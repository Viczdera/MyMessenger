import React, { useRef } from "react";
import Router from "next/router"
import styled from "styled-components";
import Image from "next/image";
import appIcon from "../public/messageapp.svg";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Signupcall } from "./api/apiCalls";

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
    input,
    button {
      margin: 20px 0px 0px 0px;
    }
    input {
      margin: 20px 0px 0px 0px;
      width: 50%;
    }
    button {
      width: 100px;
      height: 30px;
    }
  }
`;

const login=()=> {
  const Name= useRef()
  const Email= useRef();
  const Password=useRef();
  const CfPassword=useRef();

  const clicked = (e) => {
    e.preventDefault();
    if(CfPassword.current.value===Password.current.value){

      Signupcall({name:Name.current.value, email: Email.current.value, password:Password.current.value})
      Router.push("/login")

    }else{

      CfPassword.current.setCustomValidity("Password does not match")

    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <form>
          <Image src={appIcon} alt="appicon" width="100px" height="100px" />
          <h3>SIGNUP</h3>
          <input placeholder="Enter your name" ref={Name} required />
          <input
            placeholder="Enter your email"
            ref={Email}
            type="email"
            required
          />
          <input
            placeholder="Enter your password"
            ref={Password}
            required
            minLength="8"
            type="password"
          />
          <input
            placeholder="Re-enter password"
            ref={CfPassword}
            required
            type="password"
          />
          <button onClick={clicked}>SignUp</button>
          <h6>
            Already have an account?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>{" "}
          </h6>
        </form>
      </Container>
    </>
  );
}

export default login;
