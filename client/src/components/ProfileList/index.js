import React from 'react';
import { Link } from 'react-router-dom';


import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useMutation } from '@apollo/client';
import { ADD_CONNECTION } from '../../utils/mutations';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';
import { borderColor } from '@mui/system';


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

      {/* <div className="flex-row justify-space-between my-4">

        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="col-12 col-xl-6">
              <Card sx={{ minWidth: 275, background: '#e6e9ec' }} >

                <CardContent>
                  <CardHeader
                    title={
                      <Typography sx={{ fontSize: '25px', color: "#052541", fontWeight: 'bold' }} gutterBottom>
                        {profile.name}
                      </Typography>}
                    subheader={
                      <Typography variant="h5" component="div" sx={{ color: "#052541", fontSize: '14px' }}>
                        {profile.membershipType}
                      </Typography>}
                  ></CardHeader>
                  <Typography><Link

                    className="devButton"
                    to={`/profiles/${profile._id}`}>
                    View Profile
                  </Link></Typography>
                </CardContent>
                <CardActions
                  sx={{ ml: '10px' }}>


                  <Link onClick={(event) => handleConnection(event, profile._id)}><PersonAddIcon /></Link>
                </CardActions>

              </Card>
              <br />
            </div>
          ))}
      </div> */}

    </div>
  );
};

export default ProfileList;
