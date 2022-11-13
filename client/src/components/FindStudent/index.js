import React, { useState } from "react";
import { QUERY_PROFILES,  QUERY_MENTORS,  QUERY_MENTEES } from '../../utils/queries';
import ProfileList from '../ProfileList';
import { useQuery } from '@apollo/client';

import Filter from "../Filter";



function FindStudent() {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];
  const [query, setQuery] = useState("");

  const {loading:loadingMentors, data:dataMentors } = useQuery(QUERY_MENTORS)
  const profileMentors = dataMentors?.mentors|| []
  console.log(profileMentors)

  const {loading:loadingMentees, data:dataMentees } = useQuery(QUERY_MENTEES)
  const profileMentees = dataMentees?.mentees|| []
  console.log(profileMentees)

  const [filter, setFilter] = React.useState("Mentor");
  return (

   
    <div className="col-12 col-md-10 my-3 align-center justify-center"> 
      <Filter setFilter={setFilter}/>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProfileList
          profiles={filter === "Mentee" ? profileMentees : filter === "Mentor" ? profileMentors : profiles}
        />
      )}
    </div>

  )
}


export default FindStudent;