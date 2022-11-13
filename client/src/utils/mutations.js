import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!, $membershipType: String!) {
    addProfile(name: $name, email: $email, password: $password, membershipType: $membershipType) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_SKILL = gql`
  mutation addSkill($profileId: ID!, $skill: String!) {
    addSkill(profileId: $profileId, skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SKILL = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const ADD_CONNECTION = gql`
  mutation addConnection($profileId: ID!) {
    addConnection(profileId: $profileId) {
      _id
      name
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation editProfile($profileId: ID!, $name: String, $yearsExperience: Int, $education: String, $github: String) {
  editProfile(profileId: $profileId, name: $name, yearsExperience: $yearsExperience, education: $education, github: $github) {
    _id
    github
    education
    name
    yearsExperience
  }
}
`;

export const ADD_COLLAB = gql`
mutation addCollabLink($profileId: ID!, $collabLink: String!) {
  addCollabLink(profileId: $profileId, collabLink: $collabLink) {
    _id
    name
    collabLinks
  }
}
`;

export const REMOVE_COLLAB = gql`
mutation removeCollabLink($collabLink: String!) {
  removeCollabLink(collabLink: $collabLink) {
    _id
    name
    collabLinks
  }
}
`;