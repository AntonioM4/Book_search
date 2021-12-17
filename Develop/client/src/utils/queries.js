// TODO GET ME and change vairables
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
          _id
          username
          email
          savedBooks{
            bookId
            title
            author
            image
            link
            description
          }
        }
}
`