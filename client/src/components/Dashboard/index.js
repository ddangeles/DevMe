import React from 'react';
import "./style.css"
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';

import Avatar from '../Avatar';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SkillsList from '../SkillsList';
import SkillForm from '../SkillForm';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

function Dashboard() {
    const { profileId } = useParams();

    // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
    const { loading, data } = useQuery(
        QUERY_ME,
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
                You need to be logged in to see your profile page. Use the navigation
                links above to sign up or log in!
            </h4>
        );
    }

    return (
        <div>
            <h1>Welcome, {`${profile.name}!`} </h1>
            <Box
                sx={{
                    width: "1000px",
                    maxWidth: '100%',
                    flexGrow: 1
                }}
            >
                <Grid>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={5}>
                            <Card className='cardThree' item sx={{ bgcolor: 'text.primary' }}>
                                <CardContent color="text.primary">
                                    <Stack spacing={2} direction="row">
                                        {profile.skills.map((skill) => (
                                            <span><Badge className='badge'>{`${skill}`}</Badge></span>
                                        ))}
                                    </Stack>
                                    <Typography variant="h3" component="div" color="primary.main" py={2}>
                                        <Avatar name={profile.name} /> {`${profile.name}`}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                                        Education: {`${profile.education}`}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                                        Years of Experience: {`${profile.yearsExperience}`}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`${profile.membershipType}`}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">EDIT</Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={7}>
                            <Card className='cardTwo' sx={{ bgcolor: 'text.primary' }}>
                                <CardContent color="text.primary">
                                    <Typography variant="h5" component="div" color="primary.main">
                                        Collab Summary
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        MENTOR
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <br />
                    <Card className='cardOne' sx={{ bgcolor: 'text.primary' }}>
                        <CardContent class color="text.primary">
                            <Typography variant="h5" component="div" color="primary.main">
                                Connections
                            </Typography>
                            <List className='cardBoxOne' dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {profile.connections.map((connection) => {
                                    const labelId = `checkbox-list-secondary-label-${connection}`;
                                    return (
                                        <ListItem
                                            key={connection}
                                            disablePadding
                                        >
                                            <ListItemButton className='connectBtn' to={`/profiles/${connection._id}`}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        name={connection.name}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText id={labelId} primary={` ${connection.name}`} />
                                                
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </CardContent>
                    </Card>

                </Grid>
            </Box>
        </div>



    );
}

export default Dashboard;