import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './App.css';
import Post from './Post'
import { db, auth } from './firebase';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle () {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App () {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      }
      else {
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username])

  useEffect(
    () => {
      db.collection('posts').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(d => ({
          id: d.id,
          post: d.data()
        })));
      });
    }, []
  );

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className="App">
      {user?.displayName ? (<ImageUpload username={user.displayName}/>) : (<h>Sorry, you need to login to upload!</h>)}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="">
              </img>
            </center>

            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}>
            </Input>
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}>
            </Input>
            <Input
              placeholder="Password"
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}>
            </Input>
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>

        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="">
              </img>
            </center>

            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}>
            </Input>

            <Input
              placeholder="Password"
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}>
            </Input>
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>

        </div>
      </Modal>
      <div className="app__header"></div>
      {user ?
        (<Button type="submit" onClick={() => auth.signOut()}>Logout</Button>)
        :
        (<div className="app_loginContainer">
          <Button type="submit" onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button type="submit" onClick={() => setOpen(true)}>Sign Up</Button>

        </div>)}
      <h1>Insta Clone App</h1>
      {
        posts.map(({ id, post }) => <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />)
      }
    </div>
  );
}

export default App;
