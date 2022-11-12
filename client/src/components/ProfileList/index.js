import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css"


import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useMutation } from '@apollo/client';
import { ADD_CONNECTION } from '../../utils/mutations';




const ProfileList = ({ profiles, title }) => {
  const [addConnection, { error }] = useMutation(ADD_CONNECTION);

  const handleConnection = async (event, profileId) => {
    event.preventDefault();
    console.log(profileId)
    // remove later
    alert('Success!')

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
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-info text-light p-2 m-0">
                  {profile.name} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    Enrolled As: {profile.membershipType}
                  </span>
                  <span><button onClick={ (event)=> handleConnection(event, profile._id) }><PersonAddIcon /></button></span>
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/profiles/${profile._id}`}
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileList;
