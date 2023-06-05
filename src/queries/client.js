import { gql } from '@apollo/client'

export const GET_CLIENTS = gql`
  query {
    clients {
      _id
      name
      email
      phone
    }
  }
`
