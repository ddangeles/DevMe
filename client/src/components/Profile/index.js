import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SkillsList from '../SkillsList';
import SkillForm from '../SkillForm';

import { QUERY_ME } from '../../utils/queries';
import { EDIT_PROFILE } from '../../utils/mutations';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';

import Auth from '../../utils/auth';

import Avatar from '../Avatar';

import EditProfile from '../EditProfile';

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // // For Edit Profile
  // const [edits, setEdits] = useState('');
  // const [editProfile, { error }] = useMutation(EDIT_PROFILE);

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  const [isShown, setIsShown] = useState(false)
  const handleEdit = event => {
    event.preventDefault()
    setIsShown(current => !current);
    
  }

  const [isShown2, setIsShown2] = useState(false)
  const handleSave = event => {
    event.preventDefault()
    setIsShown(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }


  /////////////// editing data /////////////////

  

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const {data} = await editProfile({
  //       variables: { education, name, yearsExperience },
  //     });

  //     setEdits('');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  /////////////// editing data /////////////////

  return (
    <div>

      {!isShown ? 
      <Card sx={{ bgcolor: 'text.primary' }}>
        <CardContent color="primary.main">
          <CardHeader 
          avatar={
          // <Typography variant="h5" component="div" color="primary.main" fontWeight="bold">
            <Avatar name={profile.name} />
          }
          title={<Typography sx={{color: '#052541', fontSize:'25px', fontWeight:'bold', mb:-'1', mt:-'1' }}>{profile.name}</Typography>}
          subheader= {<Typography sx={{color: '#393D39', fontSize:'15px', }}>{profile.membershipType}</Typography>}
            />
          {/* </Typography> */}
          {/*           
          <Typography variant="body2" color="text.secondary">
              {`${profile.membershipType}`}
            </Typography> */}
          <Typography sx={{ mb: 1.5, fontSize: 15, ml:3, }} color="text.secondary">
            Email: {`${profile.email}`}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 15, ml:3, }} variant="body2" color="text.secondary">
            Education: {`${profile.education}`}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 15, ml:3, }} variant="body2" color="text.secondary">
            Year's Experience: {`${profile.yearsExperience}`}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 15, ml:3, }} color="text.secondary" gutterBottom>
            Skills: {`${profile.skills} `}
          </Typography>
        </CardContent>
        <CardActions sx={{ml:3}}>
          <Button 
          // sx={{background: '#052541', color: 'white'}}
          size="small" 
          onClick={handleEdit}>EDIT</Button>
        </CardActions>

      </Card> : 
      
        // <EditProfile/>
      
        <Card sx={{ bgcolor: 'text.primary' }}>
          <CardContent color="text.primary">
            <Typography variant="h5" component="div" color="primary.main">
              <Avatar

                name={profile.name} />
              {`${profile.name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${profile.membershipType}`}
            </Typography>
            <br/>
            <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
              Email: <TextField id="outlined-basic" label="update email" variant="filled" />
            </Typography>
            <br/>
            

            <Typography variant="body2" color="text.secondary">
              Education: <TextField id="outlined-basic" label="update education" variant="filled" />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Year's Experience: <TextField id="outlined-basic" label="update years experience" variant="filled" />
            </Typography>
            <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
              {`${profile.skills}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleSave}>SAVE</Button>
          </CardActions>

        </Card>
      }

      


      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <SkillForm profileId={profile._id} />
        {/* update profile form vvvv */}
        {/* <UpdateProfile profileId={profile._id} /> */}
      </div>

      {profile.skills?.length > 0 && (
        <SkillsList
          skills={profile.skills}
          isLoggedInUser={!profileId && true}
        />
      )}

    </div>
  );
};

export default Profile; 
