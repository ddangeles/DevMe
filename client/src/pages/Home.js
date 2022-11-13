import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_PROFILES } from '../utils/queries';

import ResponsiveDrawer from '../components/ResponsiveDrawer';

import Auth from "../utils/auth"

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);

  if (loading) {
    return <div>Loading...</div>;
}

  return (
    <main>
      <div className="flex-row justify-center">
      {Auth.loggedIn() ? (
        <ResponsiveDrawer />) : null }
      </div>
    </main>
  );
};

export default Home;
