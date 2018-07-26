import { adopt } from 'react-adopt'
import { Query, Mutation } from 'react-apollo'
import React from 'react'

// @TODO: Uncommment this line when the ViewerProvider is added to the app.
// import { ViewerContext } from '../context/ViewerProvider'
// -------------------------------

import {
  ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  ALL_USER_ITEMS_QUERY,
  ADD_ITEM_MUTATION
} from '../apollo/queries'

const itemsData = ({ render }) => {
  /**
   * @TODO: Use Apollo's <Query /> component to fetch all the items.
   */
  //working query!!!!!
  return (
    <Query query={ALL_ITEMS_QUERY} variables={{ filter: 2 }}>
      {({ data, loading, error }) => render({ data, loading, error })}
    </Query>
  );

  /* Note: Your query will need to filter out borrowed items.
   *
   * The final query will ultimately filter out items that belong to the
   * currently logged-in user once you have added authentication.
   */

}

const userItemsData = ({ userId, render }) => {
  /**
   * @TODO: Use Apollo's <Query /> component to fetch all of a user's items.
   */
  return (
    <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: null }}>
      {({ data: { user }, loading }) => render({ user, loading })//user, bcs they user is a name of the query
      }
    </Query>
  );
  /* Note: Your query will need to retrieve only items that belong to a
   * specific user id.
   */
}
const tagData = ({ render }) => {

  /**
   * @TODO: Use Apollo's <Query /> component to fetch all the tags.
   */
  return (
    <Query query={ALL_TAGS_QUERY}>
      {({ data: {tags}, loading, error }) => render({ tags, loading, error })}
    </Query>
  );
 

 
}

const addItem = ({ render }) => {

  return(<Mutation mutation={ADD_ITEM_MUTATION}>
  {(mutation, {data,err,load})=> render({mutation, data, err, load})}
  </Mutation>)
  /**
   * @TODO: Use Apollo's <Mutation /> component to use the signup mutation.
   *
   * Note: Be sure to use `refetchQueries` to refresh Apollo's cache with the
   * latest items for the user.
   */
  return undefined
}
const ItemsContainer = adopt({
  // @TODO: Uncomment each line as you write the corresponding query.
  itemsData,
  //userItemsData,
  tagData,
  addItem
  // -------------------------------
})

export default ItemsContainer
