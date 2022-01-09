import { createClient } from 'contentful'
import { useState, useEffect } from 'react'
import Card from '../components/Card'

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

  return (
    <>
      <div className="card margin-bottom-double" id="info">
        <div className="cardContent dropdown-toggle">
          <div className="cardContentHeadline">
            <h1>How-To Guide</h1>
            <h4 className="padding-top">So verwendest du das NGO-Matching richtig.</h4>
          </div>
          <p className="paragraph padding-bottom">Du willst aktiv werden, aber weißt nicht so genau wie du Kontakte knüpfen kannst? Oder welche Tätigkeit dir Spaß macht? Dann ist unsere Homepage genau das Richtige für dich!</p>
          <p className="paragraph padding-bottom">Hier findest du Informationen und Kontaktdaten zu verschiedenen Non-Profit-Organisationen in Wien mit denen du dich vernetzen kannst. Du kannst dich durchklicken, die Organisation finden die gut zu dir passt und hast dann auch Kontaktdaten von Vertreter*innen um dich zu connecten! ;)</p>
          <button className="toggle pill margin-left margin-bottom" onClick={toggleVisibility}>Verstanden! ✓</button>
      </div>
      </div>
      { !randomProfile ? (<p>No more profiles for now.</p>) : (
      <Card
      profile={randomProfile}
      addToLikes={addToLikes}
      addToDislikes={addToDislikes}
      toggleLikeStatus={toggleLikeStatus}
      layout="tinderStyle" /> )}
    </>
  )
}
export default Home
