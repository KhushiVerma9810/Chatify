import React , {useState , useEffect}from 'react'
import { Link  , useNavigate} from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/chat.png"
import axios from 'axios';
import {registerRoute} from "../utils/APIRoutes"
const Register = () => {
const navigate = useNavigate();
const [values , setValues]= useState({
  username:"",
  email:"",
  password:"",
  confirmpPassword:"",
});
useEffect(() => {
  if(localStorage.getItem("chat-app-user")){
    navigate("/");
  }
}, []);
// const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
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
// const handlevalidation = () => {
//   const {username, password, confirmPassword, email} = values;
  
//   // Validate password
//   const passwordInput = document.getElementById('pass');
//   if (password.length < 6) {
//     passwordInput.setCustomValidity('Password must be at least 6 characters long');
//   } else if (password !== confirmPassword) {
//     passwordInput.setCustomValidity('Passwords do not match');
//   } else {
//     passwordInput.setCustomValidity('');
// }
//   // Validate username
//   const usernameInput = document.getElementById('Username');
//   if (usernameInput.value.length < 4 || /\d/.test(username)) {
//     usernameInput.setCustomValidity('Username must be at least 4 characters long');
//   } else {
//     usernameInput.setCustomValidity('');
//   }

// const emailInput = document.getElementById('email');
// if (email === "") {
//   emailInput.setCustomValidity("Email is required");
// } else {
//   emailInput.setCustomValidity("");
// }
  
//   // confirmPassword.addEventListener('input', function() {
//   //   if (confirmPassword.value!== password.value) {
//   //     confirmPassword.setCustomValidity('Passwords do not match');
//   //   } else {
//   //     confirmPassword.setCustomValidity('');
//   //   }
//   // });
//   // let pass = document.getElementsByClassName('password');
//   // password.addEventListener("input", function(event) {
//   //   if (password.validity.tooShort) {
//   //     password.setCustomValidity("Password must be 6 or more characters");
//   //   } else {
//   //     password.setCustomValidity("");
//   //   }
//   // })
//   // if (pass.length < 6) {
//   //   // Add an event listener for the 'invalid' event
//   //   document.getElementById('password').addEventListener('invalid', function(event) {
//   //     // Set the custom validity message for the input
//   //     event.target.setCustomValidity('Password must contain 6 or more characters');
//   //   });
//   //   // Set the validity state of the input to false to trigger the 'invalid' event
//   //   document.getElementById('password').validity.valid = false;
//   // }

// //   const username = document.getElementById('Username');
// // username.addEventListener('input', () => {
// //   const usernameValue = username.value;
// //   if (usernameValue.length < 4 || /\d/.test(username)) {
// //     usernameValue.setCustomValidity('Username should only contain letters and be at least 4 characters long.');
// //   } else {
// //     usernameValue.setCustomValidity('');
// //   }

// // });

// // const{username} = values;

// // const isValid = /^[a-zA-Z]+$/.test(username) && username.length > 4;
// // const errorMessage = "Username must be at least 5 letters and contain only letters.";
// // const usernameInput = document.getElementById("username");
// // usernameInput.setCustomValidity(isValid ? "" : errorMessage);
// }

  // uname.oninvalid=function(event){
  //   event.target.setCustomValidity('Username should only contain lowercase letters. e.g. khushi')
  // }
  const handlevalidation = () => {
    let formIsValid = true;
    const { username, email, password, confirmPassword } = values;
  
    if (!username || !email || !password || !confirmPassword) {
      formIsValid = false;
      document.getElementById('myForm').elements.namedItem('email').setCustomValidity('All fields are required.');
    } else {
      document.getElementById('myForm').elements.namedItem('email').setCustomValidity('');
    }
  
    if (username.length < 5 || !(/^[a-zA-Z]+$/.test(username))) {
      formIsValid = false;
      document.getElementById('myForm').elements.namedItem('username').setCustomValidity('Username must be at least 5 letters and contain only letters.');
    } else {
      document.getElementById('myForm').elements.namedItem('username').setCustomValidity('');
    }
  
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      formIsValid = false;
      document.getElementById('myForm').elements.namedItem('email').setCustomValidity('Invalid email address.');
    } else {
      document.getElementById('myForm').elements.namedItem('email').setCustomValidity('');
    }
  
    if (password.length < 8) {
      formIsValid = false;
      document.getElementById('myForm').elements.namedItem('password').setCustomValidity('Password must be at least 8 characters long.');
    } else {
      document.getElementById('myForm').elements.namedItem('password').setCustomValidity('');
    }
  
    if (password !== confirmPassword) {
      formIsValid = false;
      document.getElementById('myForm').elements.namedItem('confirmPassword').setCustomValidity('Passwords do not match.');
    } else {
      document.getElementById('myForm').elements.namedItem('confirmPassword').setCustomValidity('');
    }
  
    return formIsValid;
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("entering handle submit");
    if (handlevalidation()) {
      console.log("validation start")
      const {username, password, confirmPassword, email} = values;
      console.log("in validation", registerRoute);
      
      try {
        const response = await axios.post(
          registerRoute,
          { username, email, password}
        );
        console.log("response:", response);
        const { data } = response;
        console.log("data:", data);
        if (!data.status) {
          alert(data.msg);
        } else {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/");
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
    {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
      <div className="brand">
        <img src={logo} alt="" />
        <h1>Chatify</h1>
      </div>
      <input type="text" placeholder='Username'
      name='username'
      id='Username'
      required
      // onChange={(e) => setUsername(e.target.value)}
      onChange={(e)=>handleChange(e)}
      // onBlur={(e)=>{handlevalidation(e)}}
      />
      <input type="email" placeholder='Email'
      name='email'
      id='email'
      // onChange={(e) => setEmail(e.target.value)}
      onChange={(e)=>handleChange(e)}
      // onBlur={(e)=>{handlevalidation(e)}}
      />
      <input type="password" placeholder='Password'
      name='password'
     className ='password'
     minLength="6"
     id='pass'
      onChange={(e)=>handleChange(e)}
      // onBlur={(e)=>{handlevalidation(e)}}
      // onChange={(e) => setPassword(e.target.value)} 
      />

      <input type="password" placeholder='Confirm Password'  
       minLength="6"
       className='password'
      name='confirmPassword'
      id='confirmpass'
      onChange={(e)=>handleChange(e)}
      // onBlur={(e)=>{handlevalidation(e)}}
      // onChange={(e) => setConfirmPassword(e.target.value)}
      />
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