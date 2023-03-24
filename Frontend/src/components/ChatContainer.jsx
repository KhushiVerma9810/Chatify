import React, { useRef } from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { sendMessageRoute } from '../utils/APIRoutes';
import { getAllMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from "uuid";



const ChatContainer = ({currentChat,currentUser , socket}) => {
  //Destructuring
  const [messages , setMessages]= useState([]);
   const [arrivalMessage ,setArrivalMessage ] = useState(null);
  // const [showNotificationDot, setShowNotificationDot] = useState(false);
  const [messageCount , setMessageCount] = useState(0);
   const scrollRef = useRef();
  const [latestMessage, setLatestMessage] = useState(null);
  useEffect(() => {
    if(currentChat){
    (async () => {
      const response = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    })();
  }
  }, [currentChat]);


    const handleSendMsg = async (msg)=>{
    await axios.post(sendMessageRoute,{
      from:currentUser._id,
      to:currentChat._id,
      message:msg,
    });
    //whwnever send message will emit
    socket.current.emit("send-msg" , {
      to:currentChat._id,
    from:currentUser._id ,  
    message:msg
  });
  const msgss = [...messages];
  msgss.push({
    fromSelf:true,
    message:msg
  });
  setMessages(msgss);
    };

    //when the first component will be loaded when socket current

    useEffect(()=>{
      let count =0;
      if(socket.current){
        socket.current.on("msg-receive" , (msg)=>{
          setArrivalMessage({
            fromSelf:false , 
            message:msg
          });
            // if (document.visibilityState !== "visible") {
            //   showNotification(msg);
            // }
          
            if ( msg.username !== currentUser) {
              count++; // increment count
              console.log("msg count:", count);
              setMessageCount(count); // set message count to updated value
              console.log("Received message from:", msg.username);
              setLatestMessage(msg);
              console.log("Received message from:", msg.username);
            }
      // }
      // if (msg.username !== 'currentChat') {
      // countRef.current++;
      // console.log("msg count:", countRef.current);
      // setMessageCount(countRef.current);
      // setLatestMessage(msg);
        })
    }
    } , [currentUser]);
   
    // useEffect(()=>{
    //   socket.on('typing1' , (data)=>{
    //    console.log(data);
    //   })
    // })

    //this will run every time when the new arrival messages
    useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
  
      //
    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    
  
   
    // const displayNotification = ({ senderName }) => {
    //   let action;
    //   action ="You have new Message from ";
      
    //   return (
    //     <span className="notification">{`${senderName} ${action} your post.`}</span>
    //   );
    // };
  
    // const handleRead = () => {
    //   setNotifications([]);
     
    // };
    const handleNotificationClick = () => {
      // Show the message notification to the user
      if (latestMessage) {
        alert(`You have a new message from ${latestMessage.username}`);
      }
      // Reset the message count to 0
      setMessageCount(0);
    };

  return (
    <>
    {currentChat &&(
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                <img
                      src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                      alt="avatar"/>
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <div className='icons'>
            <div>
        <Button onClick={handleNotificationClick}>
        <svg   xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
</svg>
{messageCount > 0 &&<span className='counter'>{messageCount}</span>}

        </Button>
        {/* {showNotifications && (
        <div className="notifications">
            {notifications.map((notification, index) => (
            <div key={index}>{displayNotification(notification)}</div>
          ))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div> */}
      {/* ) */}
      {/* } */}
    </div>
            <Logout/>
            </div>
        </div>
         <div className="chat-messages">
          {messages.map((message)=>{
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
               className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}>
                    <div  className="content " >
                  <p>{message.message }</p>
                </div>
                </div>
              </div>
            )
              })}
         </div>
           <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
    </Container>
    )}
  </>
  );
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  grid-template-rows: 15% 70% 15%;
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
  .icons{
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
.chat-messages {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
}`;
const Button  = styled.button`
display:flex;
justify-content: center;
align-items: center;
padding: 0.6rem;
border-radius: 0.5rem;
background-color: #9a86f3;
border: none;
cursor: pointer;
svg {
  font-size: 1.3rem;
  color: #ebe7ff;
  position:relative;
}
.counter{
  width:11px;
  height:9px;
  background-color:red;
  border-radius:50%
  padding:5px;
  font-size:9px;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  position:absolute;
  border-radius:2px;
  top:92px;
}
.bi{
    color:white;
}
.notifications {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  color: black;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.notification {
  padding: 5px;
  font-size: 14px;
}

.nButton {
  width: 80%;
  padding: 5px;
  margin-top: 10px;
}


`;
// const [activeChatId, setActiveChatId] = useState(null);
// const [numNewMessages, setNumNewMessages] = useState(0);

// useEffect(() => {
//   if (socket.current) {
//     socket.current.on("msg-receive", (msg) => {
//       if (msg.chatId !== activeChatId) {
//         setNumNewMessages((prev) => prev + 1);
//       }
//       setArrivalMessage({
//         fromSelf: false,
//         message: msg,
//       });
//     });
//   }
// }, [activeChatId]);

// const handleChatClick = (chatId) => {
//   setActiveChatId(chatId);
//   setNumNewMessages(0);
// };

// return (
//   <div>
//     <NotificationIcon numNewMessages={numNewMessages} />
//     <ChatList onChatClick={handleChatClick} />
//   </div>
// );


// const [isActiveChat, setIsActiveChat] = useState(false);
// const [numNewMessages, setNumNewMessages] = useState(0);

// useEffect(() => {
//   if (socket.current) {
//     socket.current.on("msg-receive", (msg) => {
//       if (!isActiveChat) {
//         setNumNewMessages((prev) => prev + 1);
//       }
//       setArrivalMessage({
//         fromSelf: false,
//         message: msg,
//       });
//     });
//   }
// }, [isActiveChat]);

// const handleChatClick = () => {
//   setIsActiveChat(true);
//   setNumNewMessages(0);
// };

// const handleChatClose = () => {
//   setIsActiveChat(false);
// };

// return (
//   <div>
//     <NotificationIcon numNewMessages={numNewMessages} />
//     <ChatWindow onClick={handleChatClick} onClose={handleChatClose} />
//   </div>
export default ChatContainer