import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
// import Avatar from '@mui/material/Avatar';

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

        <Box

            sx={{
                display: 'grid',
                gridAutoFlow: 'row',
                gridTemplateColumns: 'repeat(1, 200px)',
                gridTemplateRows: 'repeat(2, 200px)',
                gap: 1,
                width: "800px",
                maxWidth: '100%'
            }}
        >
            <h1>Welcome, {`${profile.name}!`} </h1>
            <Card sx={{ gridColumn: '1', gridRow: '1 / 4', bgcolor: 'text.primary' }}>
                <CardContent color="text.primary">
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                        {`${profile.skills}`}
                    </Typography>
                    <Typography variant="h5" component="div" color="primary.main">
                        {`${profile.name}`}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 9 }} color="text.secondary">
                        Id:{`${profile._id}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`${profile.membershipType}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">EDIT</Button>
                </CardActions>
            </Card>

            <Card sx={{ gridColumn: '2', bgcolor: 'text.primary' }}>
                <CardContent color="text.primary">
                    <Typography variant="h5" component="div" color="primary.main">
                        Collab Summary
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        MENTOR
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ gridColumn: '2', bgcolor: 'text.primary' }}>
                <CardContent color="text.primary">
                    <Typography variant="h5" component="div" color="primary.main">
                        Connections
                    </Typography>
                    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {profile.connections.map((connection) => {
                            const labelId = `checkbox-list-secondary-label-${connection}`;
                            return (
                                <ListItem
                                    key={connection}
                                    disablePadding
                                >
                                    <ListItemButton>
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


        </Box>


    );
}

export default Dashboard;