import React, { useState } from 'react';
import './style.css'

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SkillsList from '../SkillsList';
import SkillForm from '../SkillForm';

import { QUERY_ME } from '../../utils/queries';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import Auth from '../../utils/auth';

import Avatar from '../Avatar';
import UpdateProfile from '../UpdateProfile';

const Profile = () => {
  const { profileId } = useParams();

  const { loading, data } = useQuery(
    QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  const [isShown, setIsShown] = useState(false)
  const handleEdit = event => {
    event.preventDefault()
    setIsShown(current => !current);

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

  return (
    <div>
      {!isShown ?
        <Card sx={{ bgcolor: 'text.primary', width: '600px', height: '400px', borderRadius: '20px' }}>
          <CardContent color="primary.main">
            <CardHeader
              avatar={
                
                <Avatar name={profile.name} />
              }
              title={<Typography sx={{ color: '#052541', fontSize: '25px', fontWeight: 'bold', mb: -'1', mt: -'1' }}>{profile.name}</Typography>}
              subheader={<Typography sx={{ borderBottom: '1px solid black', color: '#393D39', fontSize: '15px', }}>{profile.membershipType}</Typography>}
            />
           
            <Typography sx={{ mb: 1.5, fontSize: 24, ml: 3, }} color="text.secondary">
              Email: <a href={`mailto:${profile.email}`}>{`${profile.email}`}</a>
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 24, ml: 3, }} color="text.secondary">
              Github: <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">{profile.github === null ? '' : `${profile.github}`}</a>
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 24, ml: 3, }} variant="body2" color="text.secondary">
              Education: {profile.education === null ? '' : `${profile.education}`}
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 24, ml: 3, }} variant="body2" color="text.secondary">
              Year's Experience: {profile.yearsExperience === null ? '' : `${profile.yearsExperience}`}
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 24, ml: 3, }} color="text.secondary" gutterBottom>
              Skills: {`${profile.skills}`}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              className='submitBtn'
              sx={{ alignItems: 'center', background: '#052541', color: 'white', width: '100px', borderRadius: '10px' }}
              size="small"
              onClick={handleEdit}>EDIT</Button>
          </CardActions>

        </Card> :

        <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
          <SkillForm profileId={profile._id} />


          {profile.skills?.length > 0 && (
            <SkillsList
              skills={profile.skills}
              isLoggedInUser={!profileId && true}
            />
          )}

          <UpdateProfile profileId={profile._id} setIsShown={setIsShown} />
        </div>
      }





    </div>
  );
};

export default Profile; 