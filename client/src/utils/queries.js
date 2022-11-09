import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
      membershipType
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
      membershipType
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
      membershipType
    }
  }
`;

export const QUERY_MENTORS = gql`
query Mentors {
  mentors {
    name
    membershipType
    email
  }
}
`;

export const QUERY_MENTEES = gql`
query Mentors {
  mentees {
    name
    membershipType
    email
  }
}
`;

