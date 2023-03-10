import React , {useState , useEffect}from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/chat.png"
import axios from 'axios';
import { registerRoute } from "../utils/APIRoutes";
const Register = () => {

const [values , setValues]= useState({
  username:"",
  email:"",
  password:"",
  confirmpPassword:"",
})

const handleSubmit = async(event)=>{
  event.preventDefault();
  if(handlevalidation()){
    const {password , confirmPassword,username,email}=values;
    const{data} = await axios.post(registerRoute , {
      username ,email , password,
    });
  }

}
// const usernamevalidate=()=>{
//   let usernameInput = document.getElementById("Username");

// usernameInput.addEventListener("input", function() {
//   const value = usernameInput.value.trim();
  
//   if (!/^[a-zA-Z]{5,}$/.test(value)) {
//     usernameInput.setCustomValidity("Username must contain only letters and be at least 5 characters long");
//   } else {
//     usernameInput.setCustomValidity("");
//   }
// });
// }
const handlevalidation = (values) => {
  const {username, password, confirmPassword, email} = values || {};
  
  // Validate password
  const passwordInput = document.getElementById('pass');
  if (passwordInput.value.length < 8) {
    passwordInput.setCustomValidity('Password must be at least 8 characters long');
  } else if (password !== confirmPassword) {
    passwordInput.setCustomValidity('Passwords do not match');
  } else {
    passwordInput.setCustomValidity('');
}
  // Validate username
  const usernameInput = document.getElementById('Username');
  if (usernameInput.value.length < 4 || /\d/.test(username)) {
    usernameInput.setCustomValidity('Username must be at least 4 characters long');
  } else {
    usernameInput.setCustomValidity('');
  }

const emailInput = document.getElementById('email');
if (emailInput.value === "") {
  emailInput.setCustomValidity("Email is required");
} else {
  emailInput.setCustomValidity("");
}
  
  // confirmPassword.addEventListener('input', function() {
  //   if (confirmPassword.value!== password.value) {
  //     confirmPassword.setCustomValidity('Passwords do not match');
  //   } else {
  //     confirmPassword.setCustomValidity('');
  //   }
  // });
  // let pass = document.getElementsByClassName('password');
  // password.addEventListener("input", function(event) {
  //   if (password.validity.tooShort) {
  //     password.setCustomValidity("Password must be 6 or more characters");
  //   } else {
  //     password.setCustomValidity("");
  //   }
  // })
  // if (pass.length < 6) {
  //   // Add an event listener for the 'invalid' event
  //   document.getElementById('password').addEventListener('invalid', function(event) {
  //     // Set the custom validity message for the input
  //     event.target.setCustomValidity('Password must contain 6 or more characters');
  //   });
  //   // Set the validity state of the input to false to trigger the 'invalid' event
  //   document.getElementById('password').validity.valid = false;
  // }

//   const username = document.getElementById('Username');
// username.addEventListener('input', () => {
//   const usernameValue = username.value;
//   if (usernameValue.length < 4 || /\d/.test(username)) {
//     usernameValue.setCustomValidity('Username should only contain letters and be at least 4 characters long.');
//   } else {
//     usernameValue.setCustomValidity('');
//   }

// });

// const{username} = values;

// const isValid = /^[a-zA-Z]+$/.test(username) && username.length > 4;
// const errorMessage = "Username must be at least 5 letters and contain only letters.";
// const usernameInput = document.getElementById("username");
// usernameInput.setCustomValidity(isValid ? "" : errorMessage);
}

  // uname.oninvalid=function(event){
  //   event.target.setCustomValidity('Username should only contain lowercase letters. e.g. khushi')
  // }
const handleChange=(event)=>{
  setValues({...values,[event.target.name]:event.target.value});
}
  return (
   <>
   <FormContainer>
    <form onSubmit={(event)=>{handleSubmit(event)}} onClick={(e)=>{handlevalidation(e)}}>
      <div className="brand">
        <img src={logo} alt="" />
        <h1>Chatify</h1>
      </div>
      <input type="text" placeholder='Username'
      name='username'
      id='Username'
      required
      // onBlur={usernamevalidate}
      onChange={(e)=>handleChange(e)}
      />
      <input type="email" placeholder='Email'
      name='email'
      id='email'
      onChange={(e)=>handleChange(e)}
      />
      <input type="password" placeholder='Password'
      name='password'
     className ='password'
     minlength="6"
     id='pass'
      onChange={(e)=>handleChange(e)}/>

      <input type="password" placeholder='Confirm Password'  
       minlength="6"
       className='password'
      name='confirmpassword'
      id='confirmpass'
      onChange={(e)=>handleChange(e)}/>
     <button type='submit'>Create User</button>
     <span>Already have an account?<Link to="/login">Login</Link></span>
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
export default Register