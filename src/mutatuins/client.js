import { gql } from '@apollo/client'

export const ADD_CLIENT = gql`
  mutation AddClient($name: String!, $email: String!, $phone: String) {
    addClient(name: $name, email: $email, phone: $phone) {
      _id
      name
      email
      phone
    }
  }
`

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: ID!, $name: String, $email: String, $phone: String) {
    updateClient(id: $id, name: $name, email: $email, phone: $phone) {
      _id
      name
      email
      phone
    }
  }
`

export const REMOVE_CLIENT = gql`
  mutation RemoveClient($id: ID!) {
    deleteClient(id: $id) {
      _id
    }
  }
`
