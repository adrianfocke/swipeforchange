import Image from 'next/image'
import Link from 'next/link'

const Card = ({profile, likes, toggleLikeStatus, addToLikes, addToDislikes, layout}) => {
  const { name, headquarter, description, punchline, personalStatement, bigImage, uniqueKey } = profile.fields

  return(
    <div className="card margin-bottom-double">

      <div className="cardHeader">
        <Image src={`https:${bigImage.fields.file.url}`} layout="fill" objectFit="cover" priority />
      </div>

      <div className="cardContent">
        <div className="flexbox cardContentHeadline">
          <h1>{ name }</h1>
          <span>{ headquarter }</span>
        </div>
        <p className="paragraph cardContentPunchline bg-grey">{ punchline }</p>
        <p className="paragraph padding-top">{ description }</p>
        <p className="paragraph padding-bottom padding-top">{ personalStatement }</p>
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
