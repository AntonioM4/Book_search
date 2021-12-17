// TODO change variables
const { User } = require('../models');
// const { Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    // one query
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select("-__V -password");
                return userData;
            } else {
                throw new AuthenticationError('Error. You must be logged in.')
            }
        },
    },
    // need mutations for add user, login, save book, remove book
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Error, incorrect email.');
            }

            const userPassword = await user.isCorrectPassword(password);

            if (!userPassword) {
                throw new AuthenticationError('Error, incorrect password.');
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Please log in to save a book to your profile.');
        },
        // can I use find and remove? 
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { ...args } } },
                    // { new: true }
                );
                // console.log(bookToRemove);
                return updatedUser;
            }
            // throw new AuthenticationError('Unable to remove book.');
        }
    }
}
module.exports = resolvers;