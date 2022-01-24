import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image'
import Skeleton from '../../components/Skeleton';
import { useState } from 'react'


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

  // if(!profile) return <Skeleton />

  const { uniqueKey, name, location, slogan, about, goals, tags, firstImage, secondImage, thirdImage, fourthImage, longDescription, contactName, contactStatement, contactImage, events, contactNumber,  contactEmail, contactLink} = profile.fields

  const [shownImage, setShownImage] = useState("firstImage")
  const toggleImage = () => {
    if (shownImage === "firstImage") {
      setShownImage("secondImage");
    } else if (shownImage === "secondImage") {
      setShownImage("thirdImage")
    } else if (shownImage === "thirdImage") {
      setShownImage("firstImage")
    }
  }

  return (
    <div className="card margin-bottom-double">

      <div className="cardHeader mouse-pointer">
        { shownImage === "firstImage" ? <Image src={`https:${firstImage.fields.file.url}`} layout="fill" objectFit="cover" priority onClick={toggleImage} /> : <p></p>}
        { shownImage === "secondImage" ? <Image src={`https:${secondImage.fields.file.url}`} layout="fill" objectFit="cover" priority onClick={toggleImage} /> : <p></p>}
        { shownImage === "thirdImage" ? <Image src={`https:${thirdImage.fields.file.url}`} layout="fill" objectFit="cover" priority onClick={toggleImage} /> : <p></p>}
      </div>

      <div className="cardContent">
        <div className="flexbox cardContentHeadline">
          <h1>{ name }</h1>
          <span>{ location }</span>
        </div>
        <p className="paragraph cardContentPunchline bg-grey">{ slogan }</p>
        <p className="paragraph padding-top">{ about }</p>
        <p className="paragraph padding-top">{ goals }</p>


        <p className="paragraph">
          <h2>Unsere Themen</h2>

          <ul className="flexbox link-collection margin-none padding-bottom">
            <li><button className="toggle pill">{tags[0]}</button></li>
            <li><button className="toggle pill">{tags[1]}</button></li>
            <li><button className="toggle pill">{tags[2]}</button></li>
            {
              // <li><button className="toggle pill">{tags[3]}</button></li>
              // <li><button className="toggle pill">{tags[4]}</button></li>
              // <li><button className="toggle pill">{tags[5]}</button></li>
            }
          </ul>

        </p>

        <div className="cardHeader">
          <Image src={`https:${fourthImage.fields.file.url}`} layout="fill" objectFit="cover" priority />
        </div>


        <div className="paragraph padding-top">
          { documentToReactComponents(longDescription) }
        </div>


        <p className="paragraph padding-top">
          <h2>Kontaktieren</h2>
        </p>




        <div className="cardHeader">
          <Image src={`https:${contactImage.fields.file.url}`} layout="fill" objectFit="cover" priority />
        </div>
        <p className="paragraph cardContentPunchline bg-grey">{ contactName } ist bei {name} aktiv.</p>

        <p className="paragraph padding-top">{ contactStatement }</p>
        <p className="paragraph padding-top">{ contactNumber }</p>
        <p className="paragraph padding-top padding-bottom">{ contactLink }</p>
      </div>

    </div>

  )

}
export default Details;
