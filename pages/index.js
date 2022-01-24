import { createClient } from 'contentful'
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Image from 'next/image'
import Link from 'next/link'

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
    grabRandomProfileFromProfiles();
  }, [likes, dislikes])

  const toggleVisibility = ({target}) => {
    const changeThis = document.getElementById("info");
    !target.className.includes("hidden") ? changeThis.className += " hidden" : changeThis.className = changeThis.className.replace(" hidden", "");
  }

  const emptyDislikes = () => {
    console.log("emptyDislikes");
  }

  const handleOnSwipe = (swipeDirection) => {
    if (swipeDirection === direction.RIGHT) {
      addToLikesSwipe(randomProfile)
      return;
    }

    if (swipeDirection === direction.LEFT) {
      addToDislikesSwipe(randomProfile)
      return;
    }
  }

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
        <Card
        profile={randomProfile}
        addToLikes={addToLikes}
        addToDislikes={addToDislikes}
        toggleLikeStatus={toggleLikeStatus}
        layout="tinderStyle" />
      )}

    </>
  )
}
export default Home
