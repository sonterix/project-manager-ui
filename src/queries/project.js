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
