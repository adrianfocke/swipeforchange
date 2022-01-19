import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image'
import Skeleton from '../../components/Skeleton';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'organisation'
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
    content_type: 'organisation',
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

  const { uniqueKey, name, location, slogan, about, goals, tags, firstImage, secondImage, thirdImage, fourthImage, longDescription, contactName, contactStatement, contactImage, events, contactNumber,  contactEmail, contactLink} = profile.fields

  return (


    <div className="card margin-bottom-double">
      <div className="cardHeader">
        <Image src={`https:${firstImage.fields.file.url}`} layout="fill" objectFit="cover" priority />
      </div>

      <div className="cardContent">
        <div className="flexbox cardContentHeadline">
          <h1>{ name }</h1>
          <span>{ location }</span>
        </div>
        <p className="paragraph cardContentPunchline bg-grey">{ slogan }</p>
        <p className="paragraph padding-top">{ about }</p>
        <p className="paragraph padding-top">{ goals }</p>

        <p className="paragraph padding-top">{ tags }</p>

        <div className="cardHeader">
          <Image src={`https:${fourthImage.fields.file.url}`} layout="fill" objectFit="cover" priority />
        </div>

        <div className="paragraph padding-top">
          { documentToReactComponents(longDescription) }
        </div>

        <p className="paragraph padding-top">{ contactName }</p>

        <div className="cardHeader">
          <Image src={`https:${contactImage.fields.file.url}`} layout="fill" objectFit="cover" priority />
        </div>

        <p className="paragraph padding-top">{ contactStatement }</p>
        <p className="paragraph padding-top">{ contactNumber }</p>
        <p className="paragraph padding-top">{ contactLink }</p>
      </div>

    </div>

  )

}
export default Details;
