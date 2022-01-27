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


  // const addToLikesSwipe = (profile) => { setLikes(prev =>  [...prev, profile.fields.uniqueKey]); }
  // const addToDislikesSwipe = (profile) => { setDislikes(prev =>  [...prev, profile.fields.uniqueKey]); }
  //
  // const grabRandomProfileFromProfiles = () => {
  //   const randomIndex = profiles[Math.floor(Math.random() * profiles.length)]
  //
  //   try {
  //     if (!(likes.includes(randomIndex.fields.uniqueKey)) && !(dislikes.includes(randomIndex.fields.uniqueKey))) {
  //         setRandomProfile(randomIndex)
  //       } else if (likes.length === profiles.length) {
  //         setRandomProfile(undefined);
  //       } else {
  //         grabRandomProfileFromProfiles()
  //       }
  //   } catch (e) {
  //       emptyDislikes()
  //   }
  // }

  // useEffect(() => {
  //   console.log(likes);
  //   console.log(dislikes);
  // }, [likes, dislikes])


  // const emptyDislikes = () => {
  //   setDislikes([]);
  // }

  const [randomProfile, setRandomProfile] = useState(undefined);

  const getRandomProfile = () => {
    const randomIndex = profiles[Math.floor(Math.random() * profiles.length)];
    const randomIndexUniqueKey = randomIndex.fields.uniqueKey;
    try {
      !(myLikes.has(randomIndexUniqueKey) || myDislikes.has(randomIndexUniqueKey))  ? setRandomProfile(randomIndex) : getRandomProfile();
    } catch (e) {
      console.log(e);
      myDislikes.size ? myDislikes.clear() : console.log("No more dislikes!");
    }

  }

  useEffect(() => {
    getRandomProfile();
  }, [myLikes, myDislikes])



  const [lastDirection, setLastDirection] = useState(null)

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

  // useEffect(() => {
  //   grabRandomProfileFromProfiles();
  // }, [likes, dislikes])

  // profiles.forEach((item, i) => {
  //   console.log(item);
  // });


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
          like={like}
          dislike={dislike}
          layout="tinderStyle" />
        </TinderCard>
      </>

      )}

    </>
  )
}
export default Home
