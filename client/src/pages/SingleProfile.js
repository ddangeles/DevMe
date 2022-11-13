import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE } from '../utils/queries';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';


import Avatar from '../components/Avatar';

const SingleProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

      <Typography sx={{color: '#e6e9ec', background:'#052541', border:'0px', fontSize:'25px'}}>
        You are viewing {`${profile.name}'s profile!`} 
        <br/>
      </Typography>
      <br/>

      <Card sx={{ bgcolor: '#e6e9ec', width: '400px' }}>
        <CardContent color="#052541">
          <CardHeader
            avatar={
              <Avatar name={profile.name} />
            }
            title={<Typography sx={{ color: '#052541', fontSize: '25px', fontWeight: 'bold', mb: -'1', mt: -'1' }}>{profile.name}</Typography>}
            subheader={<Typography sx={{ color: '#393D39', fontSize: '15px', }}>{profile.membershipType}</Typography>}
          />
          <Typography sx={{ mb: 1.5, fontSize: 15, ml: 3, }} color="text.secondary">
            Email: <a href={`mailto:${profile.email}`}>{`${profile.email}`}</a>
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 15, ml:3, }} color="text.secondary">
            Github: <a href={profile.github === null ? '#' : `https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">{profile.github === null ? '' : `${profile.github}`}</a>
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
          <Typography>
          {location.pathname !== '/' && (
            <Button onClick={() => navigate(-1)}
            sx={{color: '#052541'}}
            >Back</Button>)}
          </Typography>
        </CardContent>
      </Card>

    </div>
  );
};

export default SingleProfile; 
