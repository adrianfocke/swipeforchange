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

const ProfilesList = ({profiles, likes, dislikes, toggleLikeStatus, toggleStyle }) => {

  // const filteredItems = new Set();
  //
  // profiles.forEach((item) => {
  //   filteredItems.add(item.fields);
  // });



  const items = new Set()
  const [isFiltered, setIsFiltered] = useState(false)


  const grabProfiles = () => {
    profiles.forEach((item) => {
      items.add(item.fields);
      console.log("Added " + item.fields.uniqueKey + ".");
    })
  }

  useEffect(() => {
    grabProfiles();
  }, [])

  useEffect(() => {
    console.log(items);
  }, [items])


  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [profilesFromTextSearch, setProfilesFromTextSearch] = useState([]);
  const [profilesFromCheckboxSearches, setProfilesFromCheckboxSearches] = useState([]);
  const [profilesFromTagSearches, setProfilesFromTagSearches] = useState([]);

  const showFilteredProfiles = () => {

    let noDuplicateFilteredProfiles = new Set();

    profilesFromTextSearch.forEach((profile) => {
      noDuplicateFilteredProfiles.add(profile);
    });
    profilesFromCheckboxSearches.forEach((profile) => {
      noDuplicateFilteredProfiles.add(profile);
    });
    profilesFromTagSearches.forEach((profile) => {
      noDuplicateFilteredProfiles.add(profile);
    });

    let tempArray = [...noDuplicateFilteredProfiles];

    tempArray.length > 0 ? setFilteredProfiles(tempArray) : setFilteredProfiles(profiles);
  }

  useEffect(() => {
    showFilteredProfiles()
  }, [profilesFromTextSearch, profilesFromCheckboxSearches, profilesFromTagSearches])

  const [textSearch, setTextSearch] = useState('');
  const handleTextSearchChange = ({target}) => { setTextSearch(target.value) }

  const filterProfilesByTextSearch = () => {

    let profilesEntries = new Set();
    const searchableEntries = ["name", "description", "punchline"];

    profiles.forEach((item) => {

      for (const entry in searchableEntries) {
        const profileEntryValue = item.fields[searchableEntries[entry]];

        if (textSearch && profileEntryValue.toLowerCase().includes(textSearch.toLowerCase())) {
          profilesEntries.add(item);
        }
      }
    });

    let arr = [...profilesEntries];
    setProfilesFromTextSearch(arr);
  }

  useEffect(() => {
    filterProfilesByTextSearch()
  }, [textSearch])


  const [checkboxSearches, setCheckboxSearches] = useState([]);
  const addToCheckboxSearches = ({target}) => { setCheckboxSearches(prev =>  [...prev, target.value]); }
  const removeFromCheckboxSearches = ({target}) => { setCheckboxSearches(arr => arr.filter(el => el !== target.value)); }

  const toggleCheckboxStatus = ({target}) => {
    if (checkboxSearches.includes(target.value)) {
      removeFromCheckboxSearches({target});
    } else {
      addToCheckboxSearches({target});
    }
  }

  const filterProfilesByCheckboxSearches = () => {

    const tempArray = [];

    profiles.forEach((item) => {

      for (const entry in checkboxSearches) {

        if (checkboxSearches[entry] === item.fields.headquarter) {
          tempArray = [...tempArray, item]
        }
      }
    });
    setProfilesFromCheckboxSearches(tempArray)
  }

  useEffect(() => {
    filterProfilesByCheckboxSearches()
  }, [checkboxSearches])



  const [tagSearches, setTagSearches] = useState([]);

  const addToTagSearches = ({target}) => { setTagSearches(prev =>  [...prev, target.value]); }
  const removeFromTagSearches = ({target}) => { setTagSearches(arr => arr.filter(el => el !== target.value)); }

  const toggleTagStatus = ({target}) => {
    if (tagSearches.includes(target.value)) {
      removeFromTagSearches({target});
    } else {
      addToTagSearches({target});
    }
  }

  const filterProfilesByTagSearches = () => {


    const tempArray = [];

    profiles.forEach((item) => {

      for (const topic in item.fields.topics) {

        if (tagSearches.includes(item.fields.topics[topic])) {
          tempArray = [...tempArray, item]
        }
      }
    });
    setProfilesFromTagSearches(tempArray);
  }

  const toggleVisibility = ({target}) => {

    if (target.className.includes("dropdown")) {

      const changeThis = document.getElementById("search");
      !(changeThis.className.includes("hidden")) ? changeThis.className += " hidden" : changeThis.className = changeThis.className.replace(" hidden", "");
    }
  }

  const toggleEmphasis = ({target}) => {
      !(target.className.includes("focused")) ? target.className += " focused" : target.className = target.className.replace(" focused", "");
  }

  useEffect(() => {
    filterProfilesByTagSearches()
  }, [tagSearches]);


  return(
    <div>

      {
      // <div>
      //   <button className="dropdown-toggle margin-bottom padding pill" onClick={toggleVisibility}>Profile filtern</button>
      //
      //   <div className="card padding hidden margin-top margin-bottom-double" id="search">
      //     <div className="flexbox">
      //       <p className="margin-bottom">Textsuche</p>
      //       <input placeholder="Text eingeben..." onChange={handleTextSearchChange} />
      //     </div>
      //
      //     <div className="margin-top">
      //       <p className="margin-bottom">Nach Ort filtern</p>
      //       <span><input type="checkbox" value="Wien" onChange={toggleCheckboxStatus}/>Wien</span><br />
      //       <span><input type="checkbox" value="Österreich" onChange={toggleCheckboxStatus}/>Österreich</span><br />
      //     </div>
      //
      //     <div className="margin-top">
      //       <p className="margin-bottom">Nach Tags filtern</p>
      //       <button className="pill tag" value="environment" onClick={toggleTagStatus}># environment</button>
      //       <button className="pill tag margin-horizontal" value="lobau-bleibt" onClick={toggleTagStatus}># lobau-bleibt</button>
      //       <button className="pill tag" value="biodiversity" onClick={toggleTagStatus}># biodiversity</button>
      //     </div>
      //
      //   </div>
      // </div>
      }

      { filteredProfiles.map((profile, id) => (
      <Card
        likes={likes}
        profile={profile}
        toggleLikeStatus={toggleLikeStatus}
        layout="cardStyle"
        key={id} /> ))}
    </div>
  )
}
export default ProfilesList;
