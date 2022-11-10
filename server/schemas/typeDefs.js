const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    membershipType: String
    connections: [Profile]!
    skills: [String]!
    yearsExperience: Int
    education: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    mentors: [Profile]!
    mentees: [Profile]!
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!, membershipType: String!): Auth
    login(email: String!, password: String!): Auth
    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile: Profile
    removeSkill(skill: String!): Profile
    addConnection(profileId: ID!): Profile
    editProfile(profileId: ID!, name: String, email: String, password: String, membershipType: String, yearsExperience: Int, education: String): Profile
  }
`;

module.exports = typeDefs;
