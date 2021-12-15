import React,{ useEffect, useState } from 'react'
import firebase from "../../firebaseConfig/firebase.config";
import NavBar from '../../Navbar/navbar'




export default function Users() {
    const [users,setUsers]=useState([])
    const [users1,setUsers1]=useState([])
    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      jobTitle: "",
      company: "",
      employmentType: "",
    });
   
    const fetchBlogs=async()=>{
     
    
      const response=firebase.firestore().collection('Users');
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
      firebase.firestore().collection("Users").doc(e).delete()
      fetchBlogs()
    }
    const updateUser=(e)=>{
      setUser(e)
    }
    const handleInputChange = (e) => {
      // console.log(user);
      if (e.target.name === "firstName") {
        setUser({
          ...user,
          firstName: e.target.value,
        });
      } else if (e.target.name === "lastName") {
        setUser({
          ...user,
          lastName: e.target.value,
        });
      } else if (e.target.name === "country") {
        setUser({
          ...user,
          country: e.target.value,
        });
      } else if (e.target.name === "city") {
        setUser({
          ...user,
          city: e.target.value,
        });
      } else if (e.target.name === "jobTitle") {
        setUser({
          ...user,
          jobTitle: e.target.value,
        });
      }else if (e.target.name === "company") {
        setUser({
          ...user,
         company: e.target.value,
        });
      }else if (e.target.name === "employmentType") {
        setUser({
          ...user,
         employmentType: e.target.value,
        });
      }
    };
   
    const submitLogin = (e) => {
   
      firebase.firestore().collection("Users").doc(user.ID).update(user) ;
      console.log(user.ID)
    setUser({
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      jobTitle: "",
      company: "",
      employmentType: "",
    })
    //  fetchBlogs()
      // console.log(user);
    };

    return (
        <>
        <NavBar></NavBar>
          <br/>  
          <h2> User Update</h2>
      <br />
      <div className="col-md-6 col-sm-12" style={{ width: "600px", marginLeft: "29%" }}>
        <form >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
               First Name
            </label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={user.firstName}
              onChange={(e) => handleInputChange(e)}
            />
            {/* <small className="text-danger">{userErrors.name}</small> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={user.lastName}
              onChange={(e) => handleInputChange(e)}
            />
            {/* <small className="text-danger">{userErrors.email}</small> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              className="form-control"
              name="jobTitle"
              value={user.jobTitle}
              onChange={(e) => handleInputChange(e)}
            />
            {/* <small className="text-danger">{userErrors.userName}</small> */}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
            Company
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="company"
              value={user.company}
            />
            {/* <small className="text-danger">{userErrors.password}</small> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              Employment Type
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="employmentType"
              value={user.employmentType}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="country"
              value={user.country}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="city"
              value={user.city}
            />
            
          </div>

          <button type="button" className="btn btn-primary" onClick={(e) => submitLogin(e)}>
            Update
          </button>
         
        </form>
        <br />
        <br />
      </div>

<br/>

          <table className="table">
  <thead>
 
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Job Title</th>
      
    </tr>
  </thead>
  <tbody>
  {users1.map(( listValue, index ) => {
          return (
            <tr key={index}>
                <th>{index+1}</th>
              <td>{listValue.firstName}</td>
              <td>{listValue.lastName}</td>
              <td>{listValue.jobTitle}</td>
              <td>
                <button type="button" className="btn btn-warning mx-2" onClick={()=>updateUser(listValue)}>Update</button>
                <button type="button" className="btn btn-danger " onClick={()=>deleteUser(listValue.ID)}>Delete</button>
              </td>
              
            </tr>
          );
        })}
  
  </tbody>
</table>
        </>
    )
}
