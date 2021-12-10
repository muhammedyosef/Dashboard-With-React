import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBoOBo8RacS_YuLOG3auysSTdEfeCtD7Sc",
    authDomain: "linkedin-bf16c.firebaseapp.com",
    projectId: "linkedin-bf16c",
    storageBucket: "linkedin-bf16c.appspot.com",
    messagingSenderId: "339494660908",
    appId: "1:339494660908:web:bc70d9f27cc769d9bf5a89"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
  const auth=firebase.auth();
export default firebase;




// const [blogs,setBlogs]=useState([])

// const fetchBlogs=async()=>{
//   const response=db.collection('Users');
//   const data=await response.get();
//   data.docs.forEach(item=>{
//       console.log(item.data());
//    setBlogs([...blogs,item.data()])
//   })
// }
// useEffect(() => {
//   fetchBlogs();
//   console.log(blogs);
// }, [])