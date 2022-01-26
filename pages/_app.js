import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/basics.scss'

const MyApp = ({ Component, pageProps }) => {

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  // const [myLikes, setMyLikes] = useState(new Set())
  // const addToMyLikes = (foo) =>{
  //   setMyLikes(prev => new Set(prev.add(foo)))
  // }
  // const removeFromMyLikes = foo =>{
  //   setMyLikes(prev =>{
  //       return prev.filter(x => x !== foo)
  //   })
  // }

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
