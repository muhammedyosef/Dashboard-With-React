import React, { useEffect, useState } from 'react'
import NavBar from '../../Navbar/navbar';
import firebase from "../../firebaseConfig/firebase.config";

export default function Posts() {

    const [posts, setPosts] = useState([])
    const [posts1, setPosts1] = useState([])
    const [newId, setNewId] = useState('')
    const [post, setPost] = useState({
        Name: "",
        body: "",
    });

    const fetchPosts = async () => {
        const response = firebase.firestore().collection('Posts');
        const data = await response.get();
        data.docs.forEach(item => {
            setNewId(item.id);
            console.log(newId)
            console.log(item.data());
            setPosts([...posts, posts.push(item.data())])
        })
        setPosts1(posts);
    }


    useEffect(() => {
        fetchPosts();
    }, [])

    const deletePost = (e) => {
        console.log(e);
        firebase.firestore().collection("Posts").doc(newId).delete()
    }

    const updatePost = (e) => {
        console.log(e)
        setPost(e)
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
        firebase.firestore().collection("Posts").doc(newId).update(post);
        setPost({
            Name: "",
            body: "",
        })
        console.log(post.ID)
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
                    {posts1.map((post, index) => {
                        return (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{post.Name}</td>
                                <td>{post.body}</td>
                                <td>
                                    <button type="button" className="btn btn-warning mx-2" onClick={() => updatePost(post)}>Update</button>
                                    <button type="button" className="btn btn-danger " onClick={() => deletePost(post.ID)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
};
