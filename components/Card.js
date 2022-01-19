import Image from 'next/image'
import Link from 'next/link'

const Card = ({profile, likes, toggleLikeStatus, addToLikes, addToDislikes, layout}) => {
  const { uniqueKey, name, location, slogan, about, goals, tags, firstImage, secondImage, thirdImage, fourthImage, longDescription, contactName, contactStatement, contactImage, events, contactNumber,  contactEmail, contactLink} = profile.fields

  console.log(tags);

  return(
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
        <p className="paragraph padding-bottom padding-top">{ goals }</p>

        <span>{tags[0]}</span>
        <span>{tags[1]}</span>
        <span>{tags[2]}</span>
        <span>{tags[3]}</span>
        <span>{tags[4]}</span>
        <span>{tags[5]}</span>

      </div>

      <hr />

      <div className="cardAction">

        { layout === "cardStyle" ? (
          <p className="paragraph padding-bottom padding-top">
            <Link href={`/profiles/${uniqueKey}`}><a alt={`Link to ${name} profile page`}>Mehr Info</a></Link>
            <button className="toggle pill margin-horizontal" onClick={toggleLikeStatus} value={uniqueKey}>Liken<span className={`padding-left-half ${likes.includes(uniqueKey) ? "text-black" : "grey"}`}>●</span></button>
          </p>
        ) : (null) }

        { layout === "likeStyle" ? (
          <p className="paragraph padding-bottom padding-top">
            <Link href={`/profiles/${uniqueKey}`}><a alt={`Link to ${name} profile page`}>Mehr Info</a></Link>
            <button className="pill margin-horizontal" onClick={toggleLikeStatus} value={uniqueKey}>Löschen</button>
          </p>
        ) : (null) }

        { layout === "tinderStyle" ? (
          <p className="paragraph cardActionPunchline">
            <button className="pill" onClick={addToDislikes} value={uniqueKey}>Nope ✗</button>
            <Link href={`/profiles/${uniqueKey}`}><a className="margin-horizontal" alt={`Link to ${name} profile page`}>Mehr Info</a></Link>
            <button className="pill" onClick={addToLikes} value={uniqueKey}>Like ♡</button>
          </p>
        ) : (null) }

      </div>

    </div>
  )
}
export default Card
