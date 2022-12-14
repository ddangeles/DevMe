const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id }).populate("connections");
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    mentors: async (parent, { membershipType }) => {
      return Profile.find({ membershipType: "Mentor" })
    },
    mentees: async (parent, { membershipType }) => {
      return Profile.find({ membershipType: "Mentee" })
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password, membershipType }) => {
      const profile = await Profile.create({ name, email, password, membershipType });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addSkill: async (parent, { profileId, skill }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { skills: skill },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeSkill: async (parent, { skill }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { skills: skill } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addConnection: async (parent, { profileId }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        const addedProfile = await Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { connections: context.user._id },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        await Profile.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { connections: profileId },
          },
          {
            new: true,
            runValidators: true,
          }
        )
        return addedProfile
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },

    editProfile: async (parent, args, context) => {
      return Profile.findOneAndUpdate(
        { _id: context.user._id },
        args,
        {
          new: true,
          runValidators: true,
        }
      )
    },

    addCollabLink: async (parent, { profileId, collabLink }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { collabLinks: collabLink },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    },
    removeCollabLink: async (parent, { collabLink }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { collabLinks: collabLink } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
  };

  module.exports = resolvers;
