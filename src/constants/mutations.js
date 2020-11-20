import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      options: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      id
      email
      token
      username
      createdAt
    }
  }
`;
