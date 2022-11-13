import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_PROFILE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const UpdateProfile = ({ profileId, setIsShown }) => {

  const [name, setName] = useState('');
  const [educationState, setEducation] = useState('');
  const [yearsExperience, setExperience] = useState('');
  const [skill, setSkill] = useState('');
  const [github, setGithub] = useState('');

  const { loading, data } = useQuery(
    QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );
  const profile = data?.me || data?.profile || {};

  const [editProfile, { error }] = useMutation(EDIT_PROFILE);

  useEffect(() => {
    setEducation(profile.education)
    setExperience(profile.yearsExperience)
    setName(profile.name)
    setGithub(profile.github)
  }, [loading, data])

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    try {
      const data = await editProfile({
        variables: { profileId: profileId, education: educationState },
      });

      setEducation('');
    } catch (err) {
      console.error(err);
    }

    try {
      const data = await editProfile({
        variables: { profileId, name },
      });

      setName('');
    } catch (err) {
      console.error(err);
    }

    try {
      const data = await editProfile({
        variables: { profileId, github },
      });

      setGithub('');
    } catch (err) {
      console.error(err);
    }

    try {
      const data = await editProfile({
        variables: { profileId, yearsExperience: parseInt(yearsExperience) }
      });

      setExperience('');
    } catch (err) {
      console.error(err);
    }

    try {
      const data = await editProfile({
        variables: { profileId, skill },
      });

      setSkill('');
    } catch (err) {
      console.error(err);
    }
    setIsShown(false)
  };
  console.log(profile.education)
  console.log(educationState)
  return (
    <div>
      <h4>Edit Profile:</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >

          <div className="col-12 col-lg-9">
            <input
              placeholder="Name"
              defaultValue={name}
              className="form-input w-100"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-9">
            <input
              placeholder="Github Username"
              defaultValue={github}
              className="form-input w-100"
              onChange={(event) => setGithub(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-9">
            <input
              placeholder="Education"
              defaultValue={educationState}
              className="form-input w-100"
              onChange={(event) => setEducation(event.target.value)}
            />
          </div>


          <div className="col-12 col-lg-9">
            <input
              placeholder="Years"
              defaultValue={yearsExperience}
              className="form-input w-100"
              onChange={(event) => setExperience(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              SAVE
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
          You need to be logged in to endorse skills. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default UpdateProfile;
