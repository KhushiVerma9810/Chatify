import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
    const navigate = useNavigate();
    const handleclick = async()=>{
localStorage.clear();
navigate("/");
    };
  return (
    <div>
        <Button>
        <i onClick={handleclick} className="bi bi-box-arrow-left"></i>
        </Button>
    </div>
  )
}
const Button = styled.button`
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
}
.bi{
    color:white;
}`
export default Logout