import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

// @TODO: Uncomment each module as needed in your client app
// import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'  //router library, Andrei
import { Provider as ReduxProvider } from 'react-redux' //to connect store 
// -------------------------------

import registerServiceWorker from './registerServiceWorker'
import theme from './theme'

/**
 * @TODO: Initialize Apollo Client
 *
 * Uncomment the following line when Apollo Client is configured:
 */
import client from './apollo'
/*
* Below in your <App />, wrap your pages in an <ApolloProvider /> component
* and pass it `client` as the `client` prop value so they will
* have access to data exposed by your GraphQL API.
*/
import { ApolloProvider } from "react-apollo";
/**
 * @TODO: Add Routing
 *
 * Uncomment the following line when your routes are configured
 */
import Routes from './routes/index'
/*
* Below in your <App />, nest your <Routes /> inside of <BrowserRouter />
* component to enable routing in your client app.
*/

/**
 * @TODO: Initialize Redux Store
 *
 * Uncomment the following line when your Redux store is configured
 */
 import store from './redux'
 /*
 * Below in your <App />, wrap a <ReduxProvider /> component around all
 * of the app's children, and pass it the imported `store` as the `store`
 * prop's value.
 */






// -------------------------------

import './index.css'
import { ViewerProvider } from './context/ViewerProvider'


const App = () => {
  return (
    <ReduxProvider store={store}> 
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ViewerProvider>
          <BrowserRouter> 
            <Routes />
          </BrowserRouter>
         </ViewerProvider> 
      </MuiThemeProvider>
    </ApolloProvider>
    </ReduxProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
