import React from 'react'
import styled from 'styled-components'

const Notification = ({notifications , setNotifications}) => {
  const [open, setOpen] = useState(false);

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div>
        <Button onClick={()=> setOpen(!open)}>
        <svg   xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
</svg>
{notifications.length > 0 &&<span className='counter'>{notifications.length}</span>}

        </Button>
        {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  )
}

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
export default Notification