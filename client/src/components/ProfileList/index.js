import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useMutation } from '@apollo/client';
import { ADD_CONNECTION } from '../../utils/mutations';
import Alerts from '../Alerts'



const ProfileList = ({ profiles, title }) => {
  const [addConnection, { error }] = useMutation(ADD_CONNECTION);

  const handleConnection = async (event, profileId) => {
    event.preventDefault();
    console.log(profileId)
    // remove later
    try {
      const data = await addConnection({
        variables: { profileId },
      });

    } catch (err) {
      console.error(err);
    }
  };

  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="col-12 col-xl-6" >
              <div className="card" style={{borderColor:"#e6e9ec", background:'#e6e9ec'}}>
                <h4 className="card-header " style={{background:"#e6e9ec", color:"#052541", marginBottom:'-1px'}}>
                  {profile.name} <br />                  
                </h4>

                <div className="lightFont card-header " style={{background:"#e6e9ec", color:"#052541"}}>
                    {profile.membershipType}
                </div>

                <div className="lightFont card-header " style={{background:"#e6e9ec", color:"#052541"}}>
                  <Link
                      className="mediumFont"
                      to={`/profiles/${profile._id}`}
                    >
                      View Profile
                    </Link>
                </div>

                <div className="justify-center">
                  <button
                  className='profile-btn'
                  onClick={ (event)=> handleConnection(event, profile._id) }
                  style={{background:'#e6e9ec', color:'#052541', border:'none'}}
                  >
                    <PersonAddIcon />
                  </button>
                  
                  
                </div>
              
              </div>
            </div>
          ))}
      </div>


    </div>
  );
};

export default ProfileList;
