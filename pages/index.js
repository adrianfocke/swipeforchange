import { createClient } from 'contentful'
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Image from 'next/image'
import Link from 'next/link'
import TinderCard from 'react-tinder-card'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })
  const res = await client.getEntries({ content_type: 'organisation' })
  return {
    props: { profiles: res.items },
    revalidate: 10
  }
}

const Home = ({profiles, likes, dislikes, addToLikes, addToDislikes, toggleLikeStatus, setLikes, setDislikes}) => {

  // test
  const [myLikes, setMyLikes] = useState(new Set())
  const addFoo = (foo) =>{
    setMyLikes(prev => new Set(prev.add(foo)))
  }

  const [randomProfile, setRandomProfile] = useState(undefined);

  const addToLikesSwipe = (profile) => { setLikes(prev =>  [...prev, profile.fields.uniqueKey]); }
  const addToDislikesSwipe = (profile) => { setDislikes(prev =>  [...prev, profile.fields.uniqueKey]); }

  const grabRandomProfileFromProfiles = () => {
    const randomIndex = profiles[Math.floor(Math.random() * profiles.length)]

    try {
      if (!(likes.includes(randomIndex.fields.uniqueKey)) && !(dislikes.includes(randomIndex.fields.uniqueKey))) {
          setRandomProfile(randomIndex)
        } else if (likes.length === profiles.length) {
          setRandomProfile(undefined);
        } else {
          grabRandomProfileFromProfiles()
        }
    } catch (e) {
        emptyDislikes()
    }
  }

  useEffect(() => {
    console.log(likes);
    console.log(dislikes);
  }, [likes, dislikes])

  const toggleVisibility = ({target}) => {
    const changeThis = document.getElementById("info");
    !target.className.includes("hidden") ? changeThis.className += " hidden" : changeThis.className = changeThis.className.replace(" hidden", "");
  }

  const emptyDislikes = () => {
    setDislikes([]);
  }

  const [lastDirection, setLastDirection] = useState(null)

  const swiped = (direction) => {
    if (direction === "left") {
      console.log("LEFT");
      console.log(randomProfile.fields.uniqueKey);
      addToDislikesSwipe(randomProfile);
      addFoo(randomProfile.fields.uniqueKey);
      console.log(myLikes);
    } else if (direction === "right") {
      setLastDirection("right")
      addToLikesSwipe(randomProfile);
    }
  }

  const outOfFrame = () => {
    setRandomProfile(undefined);
    grabRandomProfileFromProfiles();
  }

  useEffect(() => {
    grabRandomProfileFromProfiles();
  }, [likes, dislikes])

  // profiles.forEach((item, i) => {
  //   console.log(item);
  // });

  console.log(myLikes);

  return (
    <>
      { !randomProfile ? (
        <div className="card margin-bottom-double">

          <div className="cardHeader cardHeader-small">
            <Image src={`/../public/abstract.jpg`} layout="fill" objectFit="cover" priority />
          </div>

          <div className="cardContent">
            <div className="flexbox cardContentHeadline">
              <h1>Du bist am Ende angekommen!</h1>
            </div>
            <p className="paragraph padding-bottom">
              <button className="toggle pill"><Link href="/likes"><a title="Navigate to likes">Zu deinen Likes</a></Link></button>
            </p>
          </div>
        </div>
      ) : (

        <>

        <TinderCard onSwipe={(dir) => swiped(dir)} onCardLeftScreen={() => outOfFrame()} preventSwipe={['up', 'down']}>
          <Card
          profile={randomProfile}
          addToLikes={addToLikes}
          addToDislikes={addToDislikes}
          toggleLikeStatus={toggleLikeStatus}
          layout="tinderStyle" />
        </TinderCard>
      </>

      )}

    </>
  )
}
export default Home
