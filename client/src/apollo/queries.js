import gql from 'graphql-tag'

/**
 * Item and user-related queries and mutations.
 */



const ItemFields = gql`
  fragment ItemFields on Item {
    # @TODO: Create a fragment to query the following fields for an item:
    #
    id
    title
    imageurl
    description
    created
    tags{
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
    #
    # See the Apollo docs for instructions on how to use fragments:
    # https://www.apollographql.com/docs/angular/features/fragments.html
  }

`

//query #1 ITEM_QUERY - ?
//how is it different from #2?
// # @TODO: Query an item by its id and return the ItemFields fragment.
// export const ITEM_QUERY = gql`
//    query item($id: ID!){
//    
//     ...ItemFields
//    

//   }
//   ${ItemFields}
// `
//-------------------


//query #2 ALL_ITEMS_QUERY - works
//Displays all items that are not users and are not borrowed
export const ALL_ITEMS_QUERY = gql`
    query items($filter: ID!) {
      items(filter:$filter){
        ...ItemFields
      }

      # @TODO: Query items (optionally by tag id) and return the ItemFields fragment.
    }
    ${ItemFields}
  `
//-------------------

//query #3 ALL_USER_ITEMS_QUERY - works
//Displays all items that belong to a user and items borrowed by user
//how to apply  ${ItemFields} here?
export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id:$id){
     bio
     email
     fullname

     items{
       ...ItemFields
     }
     borrowed{
      ...ItemFields
    }
    # @TODO: Query the bio, email, fullname, items, and borrowed for the user by id
    # Use the ItemFields fragment for the items and borrowed fields.
  }
  ${ItemFields}
}
`
//-------------------



//query #4 ALL_TAGS_QUERY - works
//Displays all items that belong to a user and items borrowed by user
export const ALL_TAGS_QUERY = gql`
  query {
    tags{
      id
      title
    }

    # @TODO: Query the id and title fields for tags.
  }
`
//-------------------




export const ADD_ITEM_MUTATION = gql`

  mutation addNewItem($item: NewItemInput!, $image: Upload!) {
    addItem(item:$item, image:$image){
      id
    }   # @TODO: Pass the item and image into the addItem mutation as arguments
    # and return the new item id when the mutation is complete.
  }
`

// /**
//  * Auth-related queries and mutations.
//  */

// export const VIEWER_QUERY = gql`
//   query {
//     # @TODO: Query the id, email, fullname, and bio fields for the viewer.
//   }
// `
// export const LOGOUT_MUTATION = gql`
//   mutation {
//     # @TODO: Run the logout mutation.
//   }
// `

// export const SIGNUP_MUTATION = gql`
//   mutation signup($user: SignupInput!) {
//     # @TODO: Pass the user into the signup mutation as an argument
//     # and return the id of the new user when the mutation is complete.
//   }
// `

// export const LOGIN_MUTATION = gql`
//   mutation login($user: LoginInput!) {
//     # @TODO: Pass the user into the login mutation as an argument
//     # and return the id of the new user when the mutation is complete.
//   }
// `
