import './App.css';
import {BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import { useState } from 'react';
import {signOut} from "firebase/auth"
import { auth } from './firebase-config';

function App() {
  const [isAuth,setIsAuth] = useState(localStorage.getItem("isAuth"))

  const signUserOut = ()=>{
    signOut(auth).then(()=>{
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname= "/login"
    })
  }
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home | </Link>
          {!isAuth ? <Link to="/login">Login | </Link> : (
          <>
            <Link to="/createpost">New Post |</Link>
            <div className='user-log'>
              <span className=''>{auth.currentUser.displayName}</span>
              <button className='logout-btn' onClick={signUserOut}>Log Out</button>
            </div>
          </>
          )
        }
        </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth}/>}/>
          <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
