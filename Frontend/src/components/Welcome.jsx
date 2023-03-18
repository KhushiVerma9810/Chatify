import React from 'react'
import Robot from "../assets/Robot.gif";
import { useState,useEffect } from 'react';
import styled from 'styled-components';
export default function Welcome (){
    const [userName, setUserName] = useState("");
    useEffect(() => {
        (async () => {
        setUserName(
          await JSON.parse(
            localStorage.getItem("chat-app-user")
          ).username
        );
    })();
      }, []);
  return (
   <Container>
    <img src={Robot} alt="Robot" />
    <h1>
        Welcome,<span>{userName}!</span>
    </h1>
    <h3>Please select a chat to Start Messaging.</h3>
   </Container>
  );
}
const Container = styled.div`
display:flex;
justify-content:center;
align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
