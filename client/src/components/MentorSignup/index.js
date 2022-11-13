import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../../utils/mutations';

import Auth from '../../utils/auth';

// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

const MentorSignup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    membershipType: 'Mentor',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);


  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };


  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header p-2">Sign Up as Mentor</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Full Name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="your@email.com"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  name="membershipType"
                  type="hidden"
                  value={formState.membershipType}
                  onChange={handleChange}
                />
                {/* <Box sx={{ minWidth: 200 }}>
                <InputLabel id="membership-type">Membership Type</InputLabel>
                <Select
                  labelId="membership-type"
                  id="membership-type"
                  name="membershipType"
                  value={formState.membershipType}
                  label="membershipType"
                  onChange={handleChange}
                >
                  <MenuItem value={"Mentor"}>Mentor</MenuItem>
                  <MenuItem value={"Mentee"}>Mentee</MenuItem>
                </Select>
                </Box> */}
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MentorSignup;
