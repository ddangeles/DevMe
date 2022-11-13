import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CollabForm from '../CollabForm';
import CollabLinksList from '../CollabList';

import { QUERY_ME } from '../../utils/queries'






function Collabs() {
    const { profileId } = useParams();

    // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
    const { loading, data } = useQuery(
        QUERY_ME,
        {
            variables: { profileId: profileId },
        }
    );

    const profile = data?.me || data?.profile || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile?.name) {
        return (
            <h4>
                You need to be logged in to see your collab page. Use the navigation
                links above to sign up or log in!
            </h4>
        );
    }

    return (
        <div>
            <CollabForm profileId={profile._id} />

            {profile.collabLinks?.length > 0 && (
            <CollabLinksList
              collabLinks={profile.collabLinks}
              isLoggedInUser={!profileId && true}
            />
          )}
        </div>
    )
}

export default Collabs;