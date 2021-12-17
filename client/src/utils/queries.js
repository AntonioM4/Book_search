//Unit 21, Act. #26 support code
import { gql } from "@apollo/client";

//Comes from typeDefs, and given in directions of README.md
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        description
        title
        bookId
        image
        link
      }
    }
  }
`;