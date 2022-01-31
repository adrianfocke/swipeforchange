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

const Home = ({ myLikes, myDislikes, addToSet, removeFromSet, like, dislike, profiles, likes, dislikes, addToLikes, addToDislikes, toggleLikeStatus, setLikes, setDislikes}) => {

  const [randomProfile, setRandomProfile] = useState(undefined);

  const getRandomProfile = () => {
    const randomIndex = profiles[Math.floor(Math.random() * profiles.length)];
    const randomIndexUniqueKey = randomIndex.fields.uniqueKey;
    try {
      !(myLikes.has(randomIndexUniqueKey) || myDislikes.has(randomIndexUniqueKey))  ? setRandomProfile(randomIndex) : getRandomProfile();
    } catch (e) {
      myDislikes.size ? myDislikes.clear() : console.log("No more dislikes!");
    }
  }

  useEffect(() => {
    getRandomProfile();
  }, [myLikes, myDislikes])


  const swiped = (direction) => {
    if (direction === "left") {
      addToSet(myDislikes, randomProfile.fields.uniqueKey);
    } else if (direction === "right") {
      addToSet(myLikes, randomProfile.fields.uniqueKey);
    }
  }

  const outOfFrame = () => {
    setRandomProfile(undefined);
    getRandomProfile();
  }

  return (<>
    { !randomProfile ? (
      <div className="card margin-bottom-double">
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
        <Card profile={randomProfile} like={like} dislike={dislike} layout="tinderStyle" />
      </TinderCard>
      </>
    )}

  </>)
}
export default Home
