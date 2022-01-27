import { createClient } from 'contentful'
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

const Likes = ({profiles, myLikes, dislike, myDisLikes, likes, toggleLikeStatus }) => {

  if (!myLikes.size) {
    return (<div className="card margin-bottom-double">

      <div className="cardHeader cardHeader-small">
        <Image src={`/../public/abstract.jpg`} layout="fill" objectFit="cover" priority />
      </div>

      <div className="cardContent">
        <div className="flexbox cardContentHeadline">
          <h1>Noch keine Likes!</h1>
        </div>
        <p className="paragraph padding-bottom">
          <button className="toggle pill"><Link href="/"><a title="Navigate to swiper">Likes finden</a></Link></button>
        </p>
      </div>
    </div>)
  }

  return(



    <div>
      { profiles.filter(item => myLikes.has(item.fields.uniqueKey)).map((profile, id) => (
      <Card
      myLikes={myLikes}
      myDisLikes={myDisLikes}
      dislike={dislike}
      likes={likes}
      profile={profile}
      toggleLikeStatus={toggleLikeStatus}
      layout="likeStyle"
      key={id} /> ))}
    </div>
  )
}
export default Likes;
