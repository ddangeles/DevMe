import React from 'react';
import "./style.css"
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TelegramIcon from '@mui/icons-material/Telegram';

import Avatar from '../Avatar';
import {useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../../utils/queries';

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile?.name) {
        return (
            <h4>
                You need to be logged in to see your dashboard page. Use the navigation
                links above to sign up or log in!
            </h4>
        );
    }

    return (
        <div>
            <h1 className='hello-welcome'>Welcome, <span className='profile-name'>{`${profile.name}!`}</span> </h1>
            <Box
                sx={{
                    width: "1000px",
                    maxWidth: '100%',
                    flexGrow: 1
                }}
            >
                <Grid>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={6}>
                            <Card className='cardThree' item sx={{ bgcolor: 'text.primary' }}>
                                <CardContent color="text.primary">
                                    <Stack spacing={2} direction="row">
                                        {profile.skills.map((skill) => (
                                            <span><Badge className='badge'>{`${skill}`}</Badge></span>
                                        ))}
                                    </Stack>
                                    <Typography variant="h3" component="div" color="primary.main" pt={2}>
                                        <Avatar name={profile.name} /> {`${profile.name}`}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                                        <a href={profile.github === null ? '#' : `https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">{profile.github === null ? '' : `${profile.github}`}</a>
                                    </Typography>
                                    <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                                        Education: {profile.education === null ? '' :`${profile.education}`}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                                        Years of Experience: {profile.yearsExperience === null ? '' :`${profile.yearsExperience}`}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`${profile.membershipType}`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Card className='cardTwo' sx={{ bgcolor: 'text.primary' }}>
                                <CardContent color="text.primary">
                                    <Typography variant="h5" component="div" color="primary.main">
                                        Collab Summary
                                    </Typography>
                                    {profile.collabLinks.map((collabLink) => (
                                        <Typography variant="body2" color="text.secondary" className='m-2'>
                                            <span><Badge className='badge'><a className="collab-link" href={`${collabLink}`} target="_blank" rel="noopener noreferrer">{`${collabLink}`}<TelegramIcon className='ml-1'/></a></Badge></span>
                                        </Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <br />
                    <Card className='cardOne'>
                        <CardContent className="" color="text.primary">
                            <Typography variant="h5" component="div" color="text.primary">
                                My Connections
                            </Typography>
                            <List className='cardBoxOne' dense sx={{ width: '100%', maxWidth: 360 }}>
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
                                                <Link to={`/profiles/${connection._id}`}>
                                                <ListItemText id={labelId} primary={` ${connection.name}`} />
                                                </Link>
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