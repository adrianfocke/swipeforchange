import { createClient } from 'contentful'
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { Swipeable, direction } from 'react-deck-swiper';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })
  const res = await client.getEntries({ content_type: 'profile' })
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
      { !randomProfile ? (<p>No more profiles for now.</p>) : (
      <Swipeable onSwipe={handleOnSwipe}>
        <Card
        profile={randomProfile}
        addToLikes={addToLikes}
        addToDislikes={addToDislikes}
        toggleLikeStatus={toggleLikeStatus}
        layout="tinderStyle" />
      </Swipeable>
      )}

    </>
  )
}
export default Home
