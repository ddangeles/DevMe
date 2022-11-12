import React from 'react';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SkillsList from '../components/SkillsList'
import SkillForm from '../components/SkillForm'

import { QUERY_SINGLE_PROFILE } from '../utils/queries';

import Auth from '../utils/auth';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';

import Avatar from '../components/Avatar';

const SingleProfile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    QUERY_SINGLE_PROFILE,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  //   if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
  //     return <Navigate to="/me" />;
  //   }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (


      <h4>
        You need to be logged in to see their profile. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>

      <h2 className="card-header">
        You are viewing {`${profile.name}'s profile!`}
      </h2>


      {/* <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <SkillForm profileId={profile._id} />
      </div>

      {profile.skills?.length > 0 && (
        <SkillsList
          skills={profile.skills}
          isLoggedInUser={!profileId && true}
        />
      )} */}

      <Card sx={{ bgcolor: '#e6e9ec', width: '400px' }}>
        <CardContent color="#052541">
          <CardHeader
            avatar={
              <Avatar name={profile.name} />
            }
            title={<Typography sx={{ color: '#052541', fontSize: '25px', fontWeight: 'bold', mb: -'1', mt: -'1' }}>{profile.name}</Typography>}
            subheader={<Typography sx={{ color: '#e6e9ec', fontSize: '15px', }}>{profile.membershipType}</Typography>}
          />
          <Typography sx={{ mb: 1.5, fontSize: 15, ml: 3, }} color="text.secondary">
            Email: {`${profile.email}`}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 15, ml: 3, }} variant="body2" color="text.secondary">
            Education: {`${profile.education}`}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 15, ml: 3, }} variant="body2" color="text.secondary">
            Year's Experience: {`${profile.yearsExperience}`}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 15, ml: 3, }} color="text.secondary" gutterBottom>
            Skills: {`${profile.skills} `}
          </Typography>
        </CardContent>
      </Card>

    </div>
  );
};

export default SingleProfile; 
