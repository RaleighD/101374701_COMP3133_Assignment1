const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    username: String
    email: String
    password: String!
  }

  input EmployeeInput {
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    login(credentials: LoginInput): User
    getAllEmployees: [Employee]
    searchEmployeeById(id: ID!): Employee
  }

  type Mutation {
    signup(input: SignupInput): User
    addNewEmployee(input: EmployeeInput): Employee
    updateEmployeeInfo(id: ID!, input: EmployeeInput): Employee
    deleteEmployee(id: ID!): String # Returns a success message
  }
`;

module.exports = typeDefs;
