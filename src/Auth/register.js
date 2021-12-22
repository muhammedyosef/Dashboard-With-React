import { useState } from "react";
import firebase from "../firebaseConfig/firebase.config";
import NavBar from "../Navbar/navbar";

export default function Register() {
  const namereg = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9\.]+\@[a-z]{2,}\.[a-z]{3,}$/;
  const userRegex = /^[A-Za-z]*$/;
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const passwordRegex = /^[0-9]{6,20}/;
  const [user, setUser] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [userErrors, setUserErrors] = useState({
    name: null,
    email: null,
    userName: null,
    password: null,
    confirmPassword: null,
  });
//   const [uid, setUid] = useState("");

  const handleInputChange = (e) => {
    // console.log(user);
    if (e.target.name === "name") {
      setUser({
        ...user,
        name: e.target.value,
      });
    } else if (e.target.name === "email") {
      setUser({
        ...user,
        email: e.target.value,
      });
    } else if (e.target.name === "userName") {
      setUser({
        ...user,
        userName: e.target.value,
      });
    } else if (e.target.name === "password") {
      setUser({
        ...user,
        password: e.target.value,
      });
    } else if (e.target.name === "confirmPassword") {
      setUser({
        ...user,
        confirmPassword: e.target.value,
      });
    }

    // if(namereg.test(user.name)){
    //   setUserErrors({
    //       ...userErrors,
    //       name:null
    //   })
    //  }else{
    //      setUserErrors({
    //          ...userErrors,
    //          name:"please enter your name"
    //      })
    //  }

    //  if(emailRegex.test(user.email)){
    //   setUserErrors({
    //       ...userErrors,
    //       email:null
    //   })
    //  }else{
    //      setUserErrors({
    //          ...userErrors,
    //          email:"please enter Valid mail"
    //      })

    //  }

    //  if(userRegex.test(user.userName)){
    //   setUserErrors({
    //       ...userErrors,
    //       userName:null
    //   })
    //  }else{
    //      setUserErrors({
    //          ...userErrors,
    //          userName:"please enter no spaces"
    //      })
    //  } if(passwordRegex.test(user.password)){
    //   setUserErrors({
    //       ...userErrors,
    //       password:null
    //   })
    //  }else{
    //      setUserErrors({
    //          ...userErrors,
    //          password:"please enter upper and small cases"
    //      })
    //  } if(user.password===user.confirmPassword){
    //   setUserErrors({
    //       ...userErrors,
    //       confirmPassword:null
    //   })
    //  }else{
    //      setUserErrors({
    //          ...userErrors,
    //          confirmPassword:"please enter your password again"
    //      })
    //  }

    switch (e.target.name) {
      case "name":
        setUserErrors({
          ...userErrors,
          name:
            namereg.test(e.target.value) === false
              ? "please enter your name"
              : null,
        });
        break;
      case "email":
        setUserErrors({
          ...userErrors,
          email:
            emailRegex.test(e.target.value) === false
              ? "please enter valid mail"
              : null,
        });
        break;
      case "userName":
        setUserErrors({
          ...userErrors,
          userName:
            userRegex.test(e.target.value) === false
              ? "please no spaces"
              : null,
        });
        break;
      case "password":
        setUserErrors({
          ...userErrors,
          password:
            passwordRegex.test(e.target.value) === false
              ? "please enter upper and low case"
              : null,
        });
        break;
      case "confirmPassword":
        setUserErrors({
          ...userErrors,
          confirmPassword:
            user.password !== e.target.value
              ? "please repeat your password"
              : null,
        });
        break;
      default:
        break;
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    
    if (!userErrors.email && !userErrors.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
            firebase.firestore().collection("admins").doc(res.user.uid).set({id:res.user.uid,
            name:user.name,email:user.email,userName:user.userName});
        })
        .catch((err) => {
          console.log(err);
        });
      
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <br />
      <h2> Add Admin</h2>
      <br />
      <div className="col-md-6 col-sm-12" style={{ width: "600px", marginLeft: "29%" }}>
        <form onSubmit={(e) => submitLogin(e)}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={(e) => handleInputChange(e)}
            />
            <small className="text-danger">{userErrors.name}</small>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={user.email}
              onChange={(e) => handleInputChange(e)}
            />
            <small className="text-danger">{userErrors.email}</small>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              name="userName"
              value={user.userName}
              onChange={(e) => handleInputChange(e)}
            />
            <small className="text-danger">{userErrors.userName}</small>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="password"
              value={user.password}
            />
            <small className="text-danger">{userErrors.password}</small>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              confim Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="confirmPassword"
              value={user.confirmPassword}
            />
            <small className="text-danger">{userErrors.confirmPassword}</small>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Admin
          </button>
        </form>
        <br />
        <br />
      </div>
    </>
  );
}
