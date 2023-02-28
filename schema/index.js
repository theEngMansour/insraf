import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    name: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createUser(userInput: UserInput!): AuthData
    login(email: String!, password: String!): AuthData
  }
`;