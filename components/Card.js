import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'


const Card = ({profile, myLikes, myDislikes, addToSet, removeFromSet, like, dislike, likes, addToLikes, addToDislikes, layout}) => {
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

  const toggleLike = ({target}) => {
    const item = target.value

    console.log(myDisLikes);

    if (myLikes.has(item)) {
      removeFromSet(myLikes, item)
      dislike({target})
    } else if (myDislikes.has(item)) {
      removeFromSet(myDisLikes, item)
      like({target})
    } else {
      like({target})
    }

  }


  const toggleLikeStatus = ({target}) => {
    if (likes.includes(target.value)) {
      removeFromLikes({target})
      addToDislikes({target})
    } else if (dislikes.includes(target.value)) {
      removeFromDislikes({target})
      addToLikes({target})
    } else {
      addToLikes({target})
    }
  }

  return(
    <div className="card margin-bottom-double">

      <div className="cardHeader mouse-pointer">
        { shownImage === "firstImage" ? <Image src={`https:${firstImage.fields.file.url}`} layout="fill" objectFit="cover" priority onClick={toggleImage} /> : <p></p>}
        { shownImage === "secondImage" ? <Image src={`https:${secondImage.fields.file.url}`} layout="fill" objectFit="cover" onClick={toggleImage} /> : <p></p>}
        { shownImage === "thirdImage" ? <Image src={`https:${thirdImage.fields.file.url}`} layout="fill" objectFit="cover" onClick={toggleImage} /> : <p></p>}
      </div>

      <div className="cardContent">
        <div className="flexbox cardContentHeadline">
          <h1>{ name }</h1>
          <span>{ location }</span>
        </div>
        <p className="paragraph cardContentPunchline bg-grey">{ slogan }</p>
        <p className="paragraph padding-top padding-bottom">{ about }</p>

          { layout === "tinderStyle" ? (

            <>
            <p className="paragraph">{ goals }</p>


              <ul className="flexbox paragraph link-collection margin-none padding-top padding-bottom">
                <li><button className="toggle pill tags">{tags[0]}</button></li>
                <li><button className="toggle pill tags">{tags[1]}</button></li>
                <li><button className="toggle pill tags">{tags[2]}</button></li>
                { tags[3] ? <li><button className="toggle pill tags">{tags[3]}</button></li> : null }
                { tags[4] ? <li><button className="toggle pill tags">{tags[3]}</button></li> : null }
                { tags[5] ? <li><button className="toggle pill tags">{tags[3]}</button></li> : null }
              </ul>

            </>

          ) : (null) }


      </div>

      <hr />

      <div className="cardAction">

        { layout === "cardStyle" ? (
          <p className="paragraph padding-bottom padding-top">
            <Link href={`/profile/${uniqueKey}`}><a alt={`Link to ${name} profile page`}>Mehr Info</a></Link>
            {
              // <button className="toggle pill margin-horizontal" onClick={toggleLike} value={uniqueKey}>Liken<span className={`padding-left-half ${likes.includes(uniqueKey) ? "text-black" : "grey"}`}>●</span></button>
            }
          </p>
        ) : (null) }

        { layout === "likeStyle" ? (
          <p className="paragraph padding-bottom padding-top">
            <Link href={`/profile/${uniqueKey}`}><a alt={`Link to ${name} profile page`}>Mehr Info</a></Link>
            <button className="pill margin-horizontal" onClick={dislike} value={uniqueKey}>Löschen</button>
          </p>
        ) : (null) }

        { layout === "tinderStyle" ? (

          <p className="paragraph cardActionPunchline">
            <button className="pill" onClick={dislike} value={uniqueKey}>Nope ✗</button>
            <Link href={`/profile/${uniqueKey}`}><a className="margin-horizontal" alt={`Link to ${name} profile page`}>Mehr Info</a></Link>
            <button className="pill" onClick={like} value={uniqueKey}>Like ♡</button>
          </p>

        ) : (null) }

      </div>

    </div>
  )
}
export default Card
