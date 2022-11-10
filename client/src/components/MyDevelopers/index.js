import React from "react";
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_CONNECTION } from '../../utils/mutations';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

import Avatar from '../Avatar';

function MyDevelopers() {
    const { profileId } = useParams();
    const { loading, data } = useQuery(
        QUERY_ME,
        {
            variables: { profileId: profileId },
        }
    );

    const profile = data?.me || data?.profile || {};

    console.log(profile)

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
    };

        return (
        <div>
            <div>{`${profile.name}'s developer connections:`}</div>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {profile.connections.map((connection) => (
                    <><ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                            
                            name={connection.name}/>

                        </ListItemAvatar>
                        <ListItemText
                            primary={connection.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {connection.email}
                                    </Typography>
                                    <Link
                                        className="btn btn-block btn-squared btn-light text-dark"
                                        to={`/profiles/${connection._id}`}
                                    >
                                        View Profile
                                    </Link>

                                </React.Fragment>
                            }
                        />
                    </ListItem>
                        <Divider variant="inset" component="li" />
                    </>

                ))}


            </List>

        </div>
    );



}

export default MyDevelopers;