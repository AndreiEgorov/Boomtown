
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import Bar from './bar'

import styles from './styles'



import ItemsContainer from '../../containers/ItemsContainer';





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
    <ItemsContainer>

      {({ itemsData: { data, loading, error } }) => {
        if (loading) return '...loading'
        if (error) return '...error'
        return data.items.map((item, index) => <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.tags.map(tag => tag.title)}</p>
          <p>{item.description}</p>
        </div>)
        console.log(data)
      }



      }
    </ItemsContainer>
  )
}

export default withStyles(styles)(Items)


// return <div><pre>{JSON.stringify(data, null, 4)}</pre></div>
// {
//   ({ itemsData: { items, loading, error } }) => {
//     if (loading) return '...loading'
//     if (error) return '...error'
//     return (
//       items.map(item => {
//         return <div>{item.title}</div>
//       })

//     )


//     {/* return loading ? (return  'Loading...') : error ? (return '...error'): (
//           items.map((item) => (<ul><li>{item} </li> </ul>)
//           )) */}


//     return loading ? (<p> Loading... </p>/* Display a loading component */)
//       : error ? (<p> Error... </p>)
//         : (

//           data.map((item) => <p>{item.title}</p>),
//           console.log(item)


//         );
