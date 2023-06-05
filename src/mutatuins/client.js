const { gql } = require('@apollo/client')

export const REMOVE_CLIENT = gql`
  mutation RemoveClient($id: ID!) {
    deleteClient(id: $id) {
      _id
      name
      email
      phone
    }
  }
`
