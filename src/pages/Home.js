import React, {useEffect, useState} from 'react'
import {getDocs, collection,deleteDoc,doc} from "firebase/firestore";
import {auth, db} from "../firebase-config"

function Home({isAuth}) {
    const [postLists,setPostList] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const postsCollectionRef = collection(db,"posts");

    useEffect(()=>{
        setIsLoading(true)
        const getPosts = async () =>{
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({...doc.data(),id: doc.id})))
        }
        getPosts();
        setIsLoading(false);
    },[postLists,postsCollectionRef]);
    const deletePost = async(id) =>{
        const postDoc = doc(db,"posts",id);
        await deleteDoc(postDoc);
    }
  return (
    <div className='homePage'>
        {isLoading && <h2>Loading data please wait...</h2>}
        {postLists.map((post) => {
            return (
                <div className='post' key={Math.random()}>                
                    <div className='postHeader'>
                        <div className='title'>
                            <h1>{post.title}</h1>
                        </div>
                        {isAuth && auth.currentUser.uid === post.author.id && (
                        <div className='deletePost'>
                            <button onClick={()=> deletePost(post.id)}>&#128465;</button>
                        </div>
                        )}
                    </div>
                    <div className='postTextContainer'>{post.post}</div>
                    <h3>@{post.author.name}</h3>
                </div>
            )
        })}
    </div>
  )
}

export default Home