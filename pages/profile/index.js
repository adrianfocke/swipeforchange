import { createClient } from 'contentful'
import { useState, useEffect } from 'react'
import Card from '../../components/Card'

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

const ProfilesList = ({profiles, myLikes, myDisLikes, like, dislike, addToSet, removeFromSet }) => {

  const [filteredProfiles, setFilteredProfiles] = useState(profiles)

  const [textSearch, setTextSearch] = useState(null);
  const textSearchChange = ({target}) => { setTextSearch(target.value) }

  const filterTextSearch = () => {
    const tempProfiles = new Set();
    const searchableEntries = ["name", "slogan", "location"];

    profiles.forEach((item) => {
      for (const entry in searchableEntries) {

        const profileEntryValue = item.fields[searchableEntries[entry]];
        if (textSearch !== null && profileEntryValue.toLowerCase().includes(textSearch.toLowerCase())) {

          tempProfiles.add(item);
        }
      }
    })

    if (tempProfiles.size) setFilteredProfiles(Array.from(tempProfiles))
  }

  useEffect(() => {
    filterTextSearch()
  }, [textSearch])

  // checkbox filtering: these are valid options
  const checkboxFields = ["location"];
  // used for returning to previous state if checkbox filter is removed
  const [previousFilteredProfiles, setPreviousFilteredProfiles] = useState([]);

  const filterCheckbox = (filter) => {
    if (!checkboxFields.includes(filter)) return

    setPreviousFilteredProfiles(filteredProfiles);
    const tempProfiles = new Set();

    if (event.target.checked) {
      filteredProfiles.forEach((item) => {
        item.fields[filter] === event.target.value ? tempProfiles.add(item) : null;
      })

      if (tempProfiles.size < filteredProfiles.length) setFilteredProfiles(Array.from(tempProfiles))

    } else {
      setFilteredProfiles(previousFilteredProfiles)
      setPreviousFilteredProfiles([])
    }
  }

  return(
    <div>
      <div id="search-items" className="flexbox margin-bottom">
        <div>
          <input placeholder="Suchen..." onChange={textSearchChange} />
        </div>
      <div>
          <span><input type="checkbox" value="Wien" onChange={() => {filterCheckbox("location")}} />Wien</span><br />
        </div>
      </div>

      { filteredProfiles.map((profile, id) => (
      <Card
        myLikes={myLikes}
        myDisLikes={myDisLikes}
        addToSet={addToSet}
        removeFromSet={removeFromSet}

        like={like}
        dislike={dislike}
        profile={profile}
        layout="cardStyle"
        key={id} /> ))}
    </div>
  )
}
export default ProfilesList;
