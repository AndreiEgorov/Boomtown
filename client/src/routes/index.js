import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Home from './../pages/Home'
import Items from './../pages/Items'
import Profile from './../pages/Profile'
import Share from './../pages/Share'
import {ViewerContext} from './../context/ViewerProvider'


export default () => (

  <ViewerContext.Consumer>
  {({loading,viewer, error})=> {
    if (loading) return "Loading ..."
   // <FullScreenLoader/>
    if (!viewer){
      return(
        <Switch>
        <Route exact path="/welcome" component={Home}/>
        <Redirect from='*' to="/welcome"/>
        </Switch>)
    }
        
      return(
        <React.Fragment>
        <Switch>
        <Route
        exact
        path="/items"
        component={Items}
      />

      <Route
        exact
        path="/share"
        component={Share}
      />


      <Route
        exact
        path="/profile/:id"
        component={Profile}

      />
      <Route
        exact
        path="/profile"
        component={Profile}

      />

      <Redirect to='/items' />
      </Switch>
      </React.Fragment>


      )
      
    }}

      </ViewerContext.Consumer>
      )

















//delete after test 

// export default () => (

//   <Fragment>
//     {/* @TODO: Add your menu component here */}
//     <Switch>
//       {/**
//        * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
//        *
//        * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
//        *
//        * Later, we'll add logic to send users to one set of routes if they're logged in,
//        * or only view the /welcome page if they are not.
//        */}

//       <Route
//         exact
//         path="/welcome"
//         component={Home}
//       />
//       <Route
//         exact
//         path="/items"
//         component={Items}
//       />

//       <Route
//         exact
//         path="/share"
//         component={Share}
//       />


//       <Route
//         exact
//         path="/profile/:id"
//         component={Profile}

//       />
//       <Route
//         exact
//         path="/profile"
//         component={Profile}

//       />

//       <Redirect to='/items' />

//     </Switch>
//   </Fragment>
// )
