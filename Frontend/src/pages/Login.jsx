import React , {useState , useEffect}from 'react'
import { Link  , useNavigate} from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/chat.png"
import axios from 'axios';
import {loginRoute} from "../utils/APIRoutes"
const Login = () => {
const navigate = useNavigate();
const [values , setValues]= useState({
  username:"",
  password:"",
});
useEffect(() => {
  if(localStorage.getItem("chat-app-user")){
    navigate("/");
  }
}, []);

  const handlevalidation = () => {
    let formIsValid = true;
    const { username, password, } = values;
  
    if (!username ||  !password) {
      formIsValid = false;
      document.getElementById('myForm').elements.namedItem('username').setCustomValidity('All fields are required.');
    } else {
      document.getElementById('myForm').elements.namedItem('username').setCustomValidity('');
    }
  
      return formIsValid;
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("entering handle submit");
    if (handlevalidation()) {
      console.log("validation start")
      const {username, password} = values;
      console.log("in validation", loginRoute);
      
      try {
        const response = await axios.post(
          loginRoute,
          { username, password}
        );
        console.log("response:", response);
        const { data } = response;
        console.log("data:", data);
        if (!data.status) {
          alert(data.msg);
        } else {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/chat");
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
    }
  };
  
  
const handleChange=(event)=>{
  setValues({...values,[event.target.name]:event.target.value});
  
}

  return (
   <>
   <FormContainer>
    <form id='myForm' onClick={(e)=>{handlevalidation(e)}} onSubmit={(event)=>{handleSubmit(event)}}  >
      <div className="brand">
        <img src={logo} alt="" />
        <h1>Chatify</h1>
      </div>
      <input type="text" placeholder='Username'
      name='username'
      id='Username'
      required
      min={5}
      onChange={(e)=>handleChange(e)}
      
      />
      <input type="password" placeholder='Password'
      name='password'
     className ='password'
     minLength="6"
     id='pass'
      onChange={(e)=>handleChange(e)}
      />
     <button type='submit'>Login</button>
     <span>Don't have an account?<Link to="/">Register</Link></span>
    </form>
   </FormContainer>

   </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login