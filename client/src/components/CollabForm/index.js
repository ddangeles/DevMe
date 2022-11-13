import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COLLAB } from '../../utils/mutations';

import Auth from '../../utils/auth';

import AddCircleIcon from '@mui/icons-material/AddCircle';

const CollabForm = ({ profileId }) => {
  const [collabLink, setCollabLink] = useState('');

  const [addCollabLink, { error }] = useMutation(ADD_COLLAB);

  const handleFormLink = async (event) => {
    event.preventDefault();

    try {
      const data = await addCollabLink({
        variables: { profileId, collabLink },
      });

      setCollabLink('');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <h4>Add Links:</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormLink}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Project Links"
              value={collabLink}
              className="form-input w-100"
              onChange={(event) => setCollabLink(event.target.value)}
            />
          </div>
          

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              <AddCircleIcon/>
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to add links. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CollabForm;
