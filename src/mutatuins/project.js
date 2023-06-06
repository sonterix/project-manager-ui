import { gql } from '@apollo/client'

export const ADD_PROJECT = gql`
  mutation AddProject($clientId: ID!, $name: String!, $description: String, $status: ProjectStatus!) {
    addProject(clientId: $clientId, name: $name, description: $description, status: $status) {
      _id
      clientId
      name
      description
      status
      client {
        name
      }
    }
  }
`

export const REMOVE_PROJECT = gql`
  mutation RemoveProject($id: ID!) {
    deleteProject(id: $id) {
      _id
    }
  }
`
