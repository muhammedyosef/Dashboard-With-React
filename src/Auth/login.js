import {  useState } from "react";
import { useHistory } from "react-router-dom";

import firebase from "../firebaseConfig/firebase.config";
import NavBar from "../Navbar/navbar";

import './login.css'
export default function Login() {
    const mailreg=/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    const pwreg=/^[0-9]{6,20}$/;
  const [user, setUser] = useState({
    emailAddress: "",
    password: "",
  });
  const [userErrors, setUserErrors] = useState({
    emailAddress: null,
    password: null,
  });
const history=useHistory();
const handleInputChange=(e)=>{

   if (e.target.name === "emailAddress") {
      setUser({
        ...user,
        emailAddress: e.target.value,
      });
      if (mailreg.test(user.emailAddress)) {
       setUserErrors({...userErrors,emailAddress:null})
      } else { 
        setUserErrors({
          ...userErrors,
          emailAddress: "please enter valid Mail",
        });
      }
    } else if (e.target.name === "password") {
      setUser({
        ...user,
        password: e.target.value,
      });
      if (pwreg.test(e.target.value)) {
        setUserErrors({
          ...userErrors,
          password: null,
        });
      } else {
        setUserErrors({
          ...userErrors,
          password: "please enter 8 digits",
        });
      }
    }

    };

    const submitLogin = (e) => {
        e.preventDefault();
        if(!userErrors.emailAddress &&!userErrors.password){
           firebase.auth().signInWithEmailAndPassword(user.emailAddress,user.password).then(res=>{console.log(res.user.uid);
  localStorage.setItem("token",res.user.uid);
history.push('/home')
}).catch(err=>{console.log(err);})
        }
      };
   
  return (
    <>
   
<div className="sidenav">
         <div className="login-main-text">
            <h2>Dashboard<br/> Login Page</h2>
            <p>Login  from here to access.</p>
         </div>
      </div>
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form ">
               <form onSubmit={(e) => submitLogin(e)}>
                  <div className="form-group">
                     <label>Email</label>
                     <input type="text" className="form-control" placeholder="Email"  name="emailAddress"
            value={user.emailAddress}
            onChange={(e) => handleInputChange(e)}/>
          <small className="text-danger">{userErrors.emailAddress}</small>

                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" className="form-control" placeholder="Password"   onChange={(e) => handleInputChange(e)}
            name="password"
            value={user.password}/>
          <small className="text-danger">{userErrors.password}</small>

                  </div>
                  <button type="submit" className="btn btn-black">Login</button>
                 
               </form>
            </div>
         </div>
      </div>
    
    </>
  );
}
