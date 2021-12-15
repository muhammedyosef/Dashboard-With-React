import React, { useEffect, useState } from 'react'
import NavBar from '../../Navbar/navbar'
import firebase from "../../firebaseConfig/firebase.config";


export default function Home() {
    const [blogs,setBlogs]=useState([])
    const [admins,setAdmins]=useState([])
    const [posts,setPosts]=useState([])

const fetchBlogs=async()=>{
  const response=firebase.firestore().collection('Users');
  const data=await response.get();
  data.docs.forEach(item=>{
      console.log(item.data());
   setBlogs([...blogs,blogs.push(item.data())])
  })
}
const Admins=async()=>{
  const response=firebase.firestore().collection('admins');
  const data=await response.get();
  data.docs.forEach(item=>{
      console.log(item.data());
   setAdmins([...admins,admins.push(item.data())])
  })
}

const Posts=async()=>{
  const response=firebase.firestore().collection('Posts');
  const data=await response.get();
  data.docs.forEach(item=>{
      console.log(item.data());
   setPosts([...posts,posts.push(item.data())])
  })
}


useEffect(() => {
  fetchBlogs();
  Admins();
  Posts();
  // console.log(blogs);
}, [])
    return (
        <>
        <NavBar></NavBar>
       <br/>
           <div className="row row-cols-1 row-cols-md-2 g-4">
  <div className="col"style={{width:"500px"}}>
    <div className="card shadow-lg">
      <img src="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">Users</h5>
        <p className="card-text">You have {blogs.length} Users on your website</p>
      </div>
    </div>
  </div>
  <div className="col"style={{width:"500px"}}>
    <div className="card shadow-lg">
      <img src="https://icon-library.com/images/new-post-icon/new-post-icon-7.jpg" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Posts</h5>
        <p className="card-text">you have {posts.length} Posts From your Users</p>
      </div>
    </div>
  </div>
  <div className="col"style={{width:"500px"}}>
    <div className="card shadow-lg">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG0HbPATpb3moViKN0YvTPXFDNZF6yl1mqHnSuSa8opLZ4IMME5IZXAd3BY00VyK13kN0&usqp=CAU" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Jobs</h5>
        <p className="card-text">you have 50Jobs Available on your website</p>
      </div>
    </div>
  </div>
  <div className="col"style={{width:"500px"}}>
    <div className="card shadow-lg">
      <img src="https://www.kindpng.com/picc/m/368-3685978_admin-icon-gray-hd-png-download.png" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Admins</h5>
        <p className="card-text">you are {admins.length} Admins  </p>
      </div>
    </div>
  </div>
</div> 

        </>
    )
}
