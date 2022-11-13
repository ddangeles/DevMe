import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_COLLAB } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const CollabLinksList = ({ collabLinks, isLoggedInUser = false }) => {
  const [removeCollabLink, { error }] = useMutation(REMOVE_COLLAB, {
    update(cache, { data: { removeCollabLink } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeCollabLink },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveLink = async (collabLink) => {
    try {
      const { data } = await removeCollabLink({
        variables: { collabLink },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!collabLinks.length) {
    return <h3>No Links Yet</h3>;
  }

  return (
    <div>
      <div className="flex-column justify-space-between my-4">
      <h4>List of Collab Links</h4>
        {collabLinks &&
          collabLinks.map((collabLink) => (
            <div key={collabLink} className="col-12">
              <div className="card mb-3">
                <p className="bg-dark text-light p-2 m-0 display-flex align-center">
                  <a href={collabLink} target="_blank">{collabLink}</a>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveLink(collabLink)}
                    >
                      X
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default CollabLinksList;
