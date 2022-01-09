import { createClient } from 'contentful'
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

const Likes = ({profiles, likes, toggleLikeStatus }) => {
  return(
    <div>
      { profiles.filter(item => likes.includes(item.fields.uniqueKey)).map((profile, id) => (
      <Card
      likes={likes}
      profile={profile}
      toggleLikeStatus={toggleLikeStatus}
      layout="likeStyle"
      key={id} /> ))}
    </div>
  )
}
export default Likes;
