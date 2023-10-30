import { gql } from "@apollo/client";

export const MUTATION_LOGIN = gql`
mutation Mutation($loginInput: Logininput!) {
  login(loginInput: $loginInput) {
    token
    user {
      email
      name
      roles
      
    }
  }
}`

export const MUTATION_REGISTER = gql`
mutation Signup($signupInput: SignUpInput!) {
  signup(signupInput: $signupInput) {
    token
    user {
      email
      name
    }
  }
}`

export const QUERY_REVALIDATE_TOKEN = gql`
query Revalidate {
  revalidate {
    token
    user {
      email
      name
      roles
    }
  }
}`

export const QUERY_ALL_BOOKS = gql`
query Books($limit: Int! = 300) {
  allBooks(limit: $limit) {
    title
    thumbnailUrl
    shortDescription
    id
    publishedDate
    longDescription
    pageCount
    authors {
      name
    }
    categories {
      name
    }
  }
}`





