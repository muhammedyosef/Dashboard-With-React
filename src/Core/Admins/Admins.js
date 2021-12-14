import React,{ useEffect, useState } from 'react'
import NavBar from '../../Navbar/navbar';
import firebase from "../../firebaseConfig/firebase.config";
export default function Admins() {

    const [users,setUsers]=useState([])
    const [users1,setUsers1]=useState([])

    const fetchBlogs=async()=>{
     
    
        const response=firebase.firestore().collection('admins');
        const data=await response.get();
        data.docs.forEach(item=>{
            console.log(item.data());
         setUsers([...users,users.push(item.data())])
        })
        // firebase.firestore().collection("Users").onSnapshot(snapshot=>{
        //   snapshot.docs.forEach(item=>{console.log(item.data());
        //     setUsers([...users,users.push(item.data())])
        //   })
        //  })
        setUsers1(users);
      }
      useEffect( () => {
        fetchBlogs();
        console.log(users);
      }, [])
      const deleteUser =(e)=>{
        console.log(e);
        firebase.firestore().collection("admins").doc(e).delete()
        // fetchBlogs()
      }
    return (
        <>
<NavBar></NavBar>

          <br/>

          <table className="table">
  <thead>
 
    <tr>
      <th scope="col">#</th>
      <th scope="col"> Name</th>
      <th scope="col">User Name</th>
      <th scope="col">email</th>
      
    </tr>
  </thead>
  <tbody>
  {users1.map(( listValue, index ) => {
          return (
            <tr key={index}>
                <th>{index+1}</th>
              <td>{listValue.name}</td>
              <td>{listValue.userName}</td>
              <td>{listValue.email}</td>
              <td>
                <button type="button" className="btn btn-danger " onClick={()=>deleteUser(listValue.id)}>Delete</button>
              </td>
              
            </tr>
          );
        })}
  
  </tbody>
</table>  
        </>
    )
}
