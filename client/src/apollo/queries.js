import gql from 'graphql-tag'

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    imageurl
    description
    created
    tags {
      id
      title
    }
    itemowner {
      id
      fullname
      email
      bio
    }

    borrower {
      id
      fullname
      email
      bio
    }

    # For future reference, see the Apollo docs for instructions on how to use fragments:
    # https://www.apollographql.com/docs/angular/features/fragments.html
  }
`

//Displays all items that are not users and are not borrowed
export const ALL_ITEMS_QUERY = gql`
  query GetAllItems($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`

//Displays all items that belong to a user and items borrowed by user

export const ALL_USER_ITEMS_QUERY = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      bio
      email
      fullname

      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`

//Displays all items that belong to a user and items borrowed by user
export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!, $image: Upload!) {
    addItem(item: $item, image: $image) {
      id
    }
  }
`

//   Auth-related queries and mutations.

export const VIEWER_QUERY = gql`
  query {
    viewer {
      id
      email
      fullname
      bio
    }
  }
`
export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`

//since the signup & signin returns are booleans
// mutation signup($user: SignupInput!) {
//     signup(user: $user) //nothing else is needed here
//   }
export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignUpInput!) {
    signup(user: $user)
  }
`

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user)
  }
`
