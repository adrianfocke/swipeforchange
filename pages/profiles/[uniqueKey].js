import { createClient } from 'contentful'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image'
import Skeleton from '../../components/Skeleton';


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'profile'
  })

  const paths = res.items.map(item => {
    return {
      params: { uniqueKey: item.fields.uniqueKey }
    }
  })

  return {
    paths: paths,
    fallback: true
  }
}


export async function getStaticProps({ params }) {

  const { items } = await client.getEntries({
    content_type: 'profile',
    'fields.uniqueKey': params.uniqueKey
  })

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { profile: items[0] },
    revalidate: 10
  }

}

const Details = ({ profile }) => {

  if(!profile) return <Skeleton />

  const { bigImage, name, description, personalStatement, topics, longDescription } = profile.fields

  return (
    <p>No work right now</p>
    // <div>
    //   <Image src={`https:${bigImage.fields.file.url}`} alt="None" width={100} height={100} />
    //   <p>{name}</p>
    //   <p>{description}</p>
    //   <p>{personalStatement}</p>
    //
    //   // <ul>
    //   //   {topics.map(item, id => (
    //   //   <li key={id}>{item}</li>
    //   //   ))}
    //   // </ul>
    //   //
    //   // {topics.map(item, id => (
    //   // <span key={id}>{item}</span>
    //   // ))}
    //
    //   <div>
    //     { documentToReactComponents(longDescription) }
    //   </div>
    //
    // </div>
  )
}
export default Details;
