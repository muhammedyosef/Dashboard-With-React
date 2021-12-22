import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useHistory ,} from 'react-router-dom';
import firebase from '../firebaseConfig/firebase.config'




export default function NavBar() {
const [admin,setAdmin]=useState({});
const [admin1,setAdmin1]=useState({});
const history=useHistory()
useEffect(async()=>{
const response = firebase.firestore().collection("admins");
const data= await response.doc(localStorage.getItem("token")).get();
setAdmin(data.data()) 
console.log(admin);
},[])
const onLogout=()=>{
  firebase.auth().signOut();
  localStorage.removeItem("token");
  window.location.reload(false)
  console.log(admin);
}
    return (
        <div className='row'>
          <div className='col-12'>
            <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/home">Dashboard</Navbar.Brand>
    <Nav className=" d-flex justify-content-between ">
      {/* <Link to="/" className="mx-3">l</Link> */}
      <Link to="/register" className="mx-3" style={{textDecoration:"none",color:"white"}}>Add Admin</Link>
      <Link to="/users" className="mx-3"style={{textDecoration:"none",color:"white"}}>Users</Link>
      <Link to="/posts" className="mx-3"style={{textDecoration:"none",color:"white"}}>Posts</Link>
      <Link to="/Jobs" className="mx-3"style={{textDecoration:"none",color:"white"}}>Jobs</Link>
      <Link to="/admins" className="mx-3"style={{textDecoration:"none",color:"white"}}>Admins</Link>
      <a  className="mx-3"style={{textDecoration:"none",color:"white"}}>|</a>
      <a  className="mx-3"style={{textDecoration:"none",color:"white"}}>{admin.userName}</a>
      <button  className="mx-3"style={{textDecoration:"none",color:"white",backgroundColor:"black"}}onClick={()=>onLogout()} >Log Out</button>
      
    </Nav>
    
    </Container>
  </Navbar> 
  </div>
        </div>
    )
}
