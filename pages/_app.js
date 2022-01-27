import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/basics.scss'

const MyApp = ({ Component, pageProps }) => {

  const [myLikes, setMyLikes] = useState(new Set())
  const [myDislikes, setMyDislikes] = useState(new Set())

  const addToSet = (set, item) => {
    if (set === myLikes) { setMyLikes(prev => new Set(prev.add(item))) }
    else if (set === myDislikes) { setMyDislikes(prev => new Set(prev.add(item))) }
  }
  const removeFromSet = (set, item) => {
    if (set === myLikes) { setMyLikes(prev =>{ return prev.filter(x => x !== item) }) }
    else if (set === myDislikes) { setMyDislikes(prev =>{ return prev.filter(x => x !== item) }) }
  }

  const like = ({target}) => {
    const item = target.value;
    addToSet(myLikes, item);
  }
  const dislike = ({target}) => {
    const item = target.value;
    addToSet(myDislikes, item);
  }

  useEffect(() => {
    console.log(myLikes);
    console.log(myDislikes);
  }, [myLikes, myDislikes])



  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const addToLikes = ({target}) => { setLikes(prev =>  [...prev, target.value]); }
  const addToDislikes = ({target}) => { setDislikes(prev =>  [...prev, target.value]); }
  const removeFromLikes = ({target}) => { setLikes(arr => arr.filter(el => el !== target.value)); }
  const removeFromDislikes = ({target}) => { setDislikes(arr => arr.filter(el => el !== target.value)); }

  const toggleLikeStatus = ({target}) => {
    if (likes.includes(target.value)) {
      removeFromLikes({target})
      addToDislikes({target})
    } else if (dislikes.includes(target.value)) {
      removeFromDislikes({target})
      addToLikes({target})
    } else {
      addToLikes({target})
    }
  }

  const toggleActivityStatus = ({target}) => {
    if (target.className.includes("toggle")) {
      !(target.className.includes("focused")) ? target.className += " focused" : target.className = target.className.replace(" focused", "");
    }
  }

  return(
      <Layout likes={likes}>
        <Head><title>Swipe for Change!</title></Head>
        <Component {...pageProps}
        myLikes={myLikes}
        myDislikes={myDislikes}
        addToSet={addToSet}
        removeFromSet={removeFromSet}
        like={like}
        dislike={dislike}

        likes={likes}
        dislikes={dislikes}
        addToLikes={addToLikes}
        addToDislikes={addToDislikes}
        toggleLikeStatus={toggleLikeStatus}
        setLikes={setLikes}
        setDislikes={setDislikes} />
      </Layout>
  )
}
export default MyApp
