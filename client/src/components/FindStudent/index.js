import React, { useEffect, useState } from "react";
import { QUERY_PROFILES } from '../../utils/queries';
import ProfileList from '../ProfileList';
import { useQuery } from '@apollo/client';
// function FindStudent() {
//   const Profile = () => {
//     const { profileId } = useParams();

//     // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
//     const { loading, data } = useQuery(
//       QUERY_PROFILES,
//       {
//         variables: { profileId: profileId, membershipType: membershipType },
//       }
//     );
// }
// }
///////////////////////////////////////////////////////
function FindStudent() {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];
  const [query, setQuery] = useState("");
  // console.log(Users.filter(users=>users.first_name.toLowerCase().includes('run')));
  return (

    // <div className='app'>
    //   <input type='text'
    //     placeholder='search'
    //     className='search'
    //     onChange={(e) => setQuery(e.target.value)}
    //   />
      // <h1>Pls Work</h1>
      // <ul className='list'>
      //   {/* {Users.map((users) => (
      //           <li key={users.id} className='listItem'>{users.last_name}</li> */}

      // </ul>
      <div className="col-12 col-md-10 my-3">
      <input type='text'
        placeholder='search'
        className='search'
        onChange={(e) => setQuery(e.target.value)}
        />
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ProfileList
            profiles={profiles}
            title="Current list of"
          />
        )}
      </div>
    // </div>

  )
}

////////////////////////////////////////////////////////////
// const FindStudent = () => {
//   const [name, setName] = useState('')
//   const { data, loading, error } = useQuery(searchUserQ, {
//     variables: { email },       
//   });

//     return (

//       <button onClick={async (event) => {
//         setName(event.target.value)


//       }} />)
//     }
export default FindStudent;