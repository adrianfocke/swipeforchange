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
    if (myDislikes.has(item)) {
      myDislikes.delete(item);
    }
    addToSet(myLikes, item);
  }
  const dislike = ({target}) => {
    const item = target.value;
    if (myLikes.has(item)) {
      myLikes.delete(item);
    }
    addToSet(myDislikes, item);
  }

  const toggleActivityStatus = ({target}) => {
    if (target.className.includes("toggle")) {
      !(target.className.includes("focused")) ? target.className += " focused" : target.className = target.className.replace(" focused", "");
    }
  }

  return(
      <Layout>
        <Head><title>Swipe for Change!</title></Head>
        <Component {...pageProps}
        myLikes={myLikes}
        myDislikes={myDislikes}
        addToSet={addToSet}
        removeFromSet={removeFromSet}
        like={like}
        dislike={dislike} />
      </Layout>
  )
}
export default MyApp
