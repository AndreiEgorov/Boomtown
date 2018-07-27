import { adopt } from 'react-adopt'
import { Query, Mutation } from 'react-apollo'
import React from 'react'


import { ViewerContext } from '../context/ViewerProvider'


import {
  ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  ALL_USER_ITEMS_QUERY,
  ADD_ITEM_MUTATION
} from '../apollo/queries'


const itemsData = ({ render }) => {
 
<ViewerContext.Consumer>
{({viewer})=>(
  <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
      {({ data, loading, error }) => render({ data, loading, error })}
    </Query>
)}
</ViewerContext.Consumer>


}

const userItemsData = ({ userId, render }) => {
  <ViewerContext.Consumer>
  {({viewer})=> (
    <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: userId || viewer.id }}>
      {({ data: { user }, loading }) => render({ user, loading })//user, bcs they user is a name of the query
      }
    </Query>
  )}
   </ViewerContext.Consumer>
  
}
const tagData = ({ render }) => {
  return (
    <Query query={ALL_TAGS_QUERY}>
      {({ data: {tags}, loading, error }) => render({ tags, loading, error })}
    </Query>
  );
 

 
}

const addItem = ({ render }) => {

<ViewerContext.Consumer>
{({viewer})=> (
  <Mutation mutation={ADD_ITEM_MUTATION}
  refetchQueries={() => [{query: ALL_USER_ITEMS_QUERY, variables: {id: viewer.id}}]}
  >
  {(mutation, {data,error,loading})=> render({mutation, data, error, loading})}
  </Mutation>
)}
</ViewerContext.Consumer>
};
 

const ItemsContainer = adopt({
 
  itemsData,
  userItemsData,
  tagData,
  addItem
  // -------------------------------
})

export default ItemsContainer
