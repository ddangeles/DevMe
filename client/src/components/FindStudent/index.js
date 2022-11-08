import React, { useEffect, useState } from "react";
import { QUERY_ME } from '../../utils/queries';

function FindStudent() {
        const [query, setQuery] = useState("");
        // console.log(Users.filter(users=>users.first_name.toLowerCase().includes('run')));
        return (
            
          <div className='app'>
            <input type='text' 
            placeholder='search' 
            className='search' 
            onChange={(e) => setQuery(e.target.value)}
            />
            <ul className='list'>
              {/* {Users.map((users) => (
                <li key={users.id} className='listItem'>{users.last_name}</li> */}
             
            </ul>
          </div>
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