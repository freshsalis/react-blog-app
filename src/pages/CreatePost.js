import React,{useEffect, useState} from 'react'
import {addDoc,collection} from "firebase/firestore"
import {db,auth} from "../firebase-config";
import { useNavigate } from 'react-router-dom';
function CreatePost({isAuth}) {
    const [title,setTitle] = useState("")
    const [post,setPost] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()

    const postsCollectionRef = collection(db,"posts");

    const savePost = async () => {
        setIsLoading(true)
        await addDoc(postsCollectionRef, {
            title, 
            post,
            author: {name: auth.currentUser.displayName,id:auth.currentUser.uid}
        });
        setIsLoading(false)
        navigate("/")
    }
    useEffect(()=>{
        if (!isAuth) {
            navigate("/login")
        }
    })
  return (
    <div className='createPostPage'>
        <div className='cpContainer'>
        <h1>Create A Post {isAuth}</h1>
        {isLoading && <div className='loader'>Saving data please wait</div>}
        <div className='inputGp'>
            <label>Title:</label>
            <input placeholder='title' onChange={(event)=> setTitle(event.target.value)}/>
        </div>
        <div className='inputGp'>
            <label>Post:</label>
            <textarea placeholder='Post...' onChange={(event) =>setPost(event.target.value)}/>
        </div>
        <button onClick={savePost}>Submit Post</button>
        </div>
        
    </div>
  )
}

export default CreatePost