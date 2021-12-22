import React, { useEffect, useState } from 'react'
import NavBar from '../../Navbar/navbar';
import firebase from "../../firebaseConfig/firebase.config";

export default function Posts() {

    const [posts, setPosts] = useState([])
    const [id, setId] = useState("")
    const [post, setPost] = useState({
        Name: "",
        body: "",
    });

    const fetchPosts = async () => {
        const response = firebase.firestore().collection('Posts');
        const data = await response.get();
        data.docs.forEach(item => {
            // setId(item.id);
           
            const data= item.data();
            data["idi"]=item.id;
            setPosts([...posts, posts.push(data)])
        })
        setPosts(posts);
    }


    useEffect(() => {
        fetchPosts();
    }, [])

    const deletePost = (idi) => {
        firebase.firestore().collection("Posts").doc(idi).delete()
     
    }

    const updatePost = (e) => {
        setPost(e)
        setId(e.idi);
    }

    const handleInputChange = (e) => {
        if (e.target.name === "Name") {
            setPost({
                ...post,
                Name: e.target.value,
            });
        } else if (e.target.name === "body") {
            setPost({
                ...post,
                body: e.target.value,
            });
        }
    }


    const submit = (e) => {

        firebase.firestore().collection("Posts").doc(id).update(post);
        setPost({
            Name: "",
            body: "",
        })
        console.log(post)
    };

    return (
        <>
            <NavBar></NavBar>
            <br />
            <h2> Post Update</h2>
            <br />
            <div className="col-md-6 col-sm-12" style={{ wIDth: "600px", marginLeft: "29%" }}>
                <form >
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="Name"
                            value={post.Name}
                            onChange={(e) => handleInputChange(e)}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Body
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="body"
                            value={post.body}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <button type="button" className="btn btn-primary" onClick={(e) => submit(e)}>
                        Update
                    </button>

                </form>
                <br />
                <br />
            </div>

            <br />

            <table className="table">
                <thead>

                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Body</th>

                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => {
                        return (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{post.Name}</td>
                                <td>{post.body}</td>
                                <td>
                                    <button type="button" className="btn btn-warning mx-2" onClick={() => updatePost(post)}>Update</button>
                                    <button type="button" className="btn btn-danger " onClick={() => deletePost(post.idi)}>Delete</button>
                                </td>

                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </>
    )
};
