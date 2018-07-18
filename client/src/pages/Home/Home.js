import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Typography from '@material-ui/core/Typography'

// import { Redirect } from 'react-router-dom'

import AccountForm from '../../components/AccountForm'

import styles from './styles'





// import gql from "graphql-tag";
import { Query } from "react-apollo";













//---------------
// testing connection to DB, delete after all queries work

// const GET_ITEMS = gql`
// #query for the first line of query type 
// #Third line from Query Type, "items(filter: ID)
// query {
//   tags {
//     id
//     title
//   }
// }

// `;
//--------------------


//query #1 ITEM_QUERY -?
// import { ITEM_QUERY } from "../../apollo/queries"


//query #2 ALL_ITEMS_QUERY - works
//Displays all items that are not users and are not borrowed

// import { ALL_ITEMS_QUERY } from "../../apollo/queries"

// const Home = ({ classes }) => {
//   return (
//     <Query query={ALL_ITEMS_QUERY} variables={{ "filter": 2 }}>
//       {({ loading, error, data }) => {
//         if (loading) return "Loading...";
//         if (error) return `Error! ${error.message}`;
//         console.log(data)
//         return (
//           <Grid
//             container
//             className={classes.root}
//             direction="row"
//             alignItems="center"
//             justify="center"
//           >
//             <Grid item xs={12} sm={12} md={6}>
//               <Typography
//                 variant="button"
//                 gutterBottom
//                 className={classes.subheading}
//               >
//                 Boomtown
//           </Typography>
//               <Typography variant="display4" className={classes.headline}>
//                 Share. Borrow. Prosper.
//           </Typography>
//             </Grid>
//             <Grid item xs={12} sm={12} md={6}>
//               <Typography gutterBottom variant="headline">
//                 Welcome home.
//           </Typography>
//               <AccountForm />
//             </Grid>
//           </Grid>
//         )
//       }}
//     </Query>
//   )
// }
//_______________________________________




//query #3 ALL_USER_ITEMS_QUERY - works
//Displays all items that belong to a user and items borrowed by user

// import { ALL_USER_ITEMS_QUERY } from "../../apollo/queries"

// const Home = ({ classes }) => {
//   return (
//     <Query query={ALL_USER_ITEMS_QUERY} variables={{ "id": 2 }}>
//       {({ loading, error, data }) => {
//         if (loading) return "Loading...";
//         if (error) return `Error! ${error.message}`;
//         console.log(data)
//         return (
//           <Grid
//             container
//             className={classes.root}
//             direction="row"
//             alignItems="center"
//             justify="center"
//           >
//             <Grid item xs={12} sm={12} md={6}>
//               <Typography
//                 variant="button"
//                 gutterBottom
//                 className={classes.subheading}
//               >
//                 Boomtown
//             </Typography>
//               <Typography variant="display4" className={classes.headline}>
//                 Share. Borrow. Prosper.
//             </Typography>
//             </Grid>
//             <Grid item xs={12} sm={12} md={6}>
//               <Typography gutterBottom variant="headline">
//                 Welcome home.
//             </Typography>
//               <AccountForm />
//             </Grid>
//           </Grid>
//         )
//       }}
//     </Query>
//   )
// }
//_______________________________________



//query #4 ALL_TAGS_QUERY - works
//Displays all items that belong to a user and items borrowed by user

import { ALL_TAGS_QUERY } from "../../apollo/queries"

const Home = ({ classes }) => {
  return (
    <Query query={ALL_TAGS_QUERY} variables={{ "id": 2 }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data)
        return (
          <Grid
            container
            className={classes.root}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                variant="button"
                gutterBottom
                className={classes.subheading}
              >
                Boomtown
            </Typography>
              <Typography variant="display4" className={classes.headline}>
                Share. Borrow. Prosper.
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography gutterBottom variant="headline">
                Welcome home.
            </Typography>
              <AccountForm />
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}
//_______________________________________


export default withStyles(styles)(Home)
