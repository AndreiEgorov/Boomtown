import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import Bar from './bar'

import styles from './styles'


//are these needed?
// import ItemsContainer from './../../containers/ItemsContainer'
import adopt from 'react-adopt'
//_____




//<ItemsContainer>
//       {({ itemsData: { items, loading, error } }) => {
//        return loading
//        ? (
//        <p> Loading... </p>/* Display a loading component */
//    )
//  : (
//  <ul>items.map()m........</ul>
//);
//}}
//</ItemsContainer>

const Items = ({ classes }) => {
  return (
    <div>
      <Bar />
      <p>
        This is the items page located at <code>/items</code>.
      </p>





    </div>
  )
}

export default withStyles(styles)(Items)



