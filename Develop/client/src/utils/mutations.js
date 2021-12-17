// TODO LOGIN_USER will execute logInUser mutation, setting up Apollo server
// ADD_USER will execute addUser
// SAVE_BOOK will execute saveBook
// REMOVE_BOOK will execture removeBook
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: bookInput!) {
  saveBook(bookData: $bookData) {
  _id
  username
  savedBooks {
    bookId
    title
    author
    image
    link
    description
  }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId) { 
    _id
    username
    savedBooks {
      bookId
      title
      author
      image
      link
      description
    }
  }
}
`;