import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query {
    projects {
      _id
      name
      description
      status
      client {
        name
      }
    }
  }
`
export const GET_PROJECT = gql`
  query ($id: ID!) {
    project(id: $id) {
      _id
      name
      description
      status
      client {
        _id
        name
        email
        phone
      }
    }
  }
`
