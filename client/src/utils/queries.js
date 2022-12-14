import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
      membershipType
      github
      education
      yearsExperience
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
      email
      education
      yearsExperience
      github
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
      github
      membershipType
      email
      education
      yearsExperience
      collabLinks
      connections {
        _id
        email
        name
        github
      }
    }
  }
`;

export const QUERY_MENTORS = gql`
query Mentors {
  mentors {
    _id
    name
    membershipType
    email
  }
}
`;

export const QUERY_MENTEES = gql`
query Mentors {
  mentees {
    _id
    name
    membershipType
    email
  }
}
`;

