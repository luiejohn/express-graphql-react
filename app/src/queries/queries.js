import { gql } from "apollo-boost";

export const getUserQuery = gql`
  {
    user {
      id
      firstName
      lastName
      property {
        state
        street
        city
        zip
      }
    }
  }
`;

export const searchUserQuery = gql`
  query($key: String) {
    searchUser(key: $key) {
      id
      firstName
      lastName
      property {
        state
        street
        city
        zip
      }
    }
  }
`;

export const searchPropertyQuery = gql`
  query($key: String) {
    searchProperty(key: $key) {
      id
      street
      city
      state
      zip
      rent
    }
  }
`;

export const searchUserAndProperty = gql`
  query($key: String) {
    searchUser(key: $key) {
      id
      firstName
      lastName
      property {
        id
        state
        street
        city
        zip
      }
    }
    searchProperty(key: $key) {
      id
      street
      city
      state
      zip
      rent
    }
  }
`;
