import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter } from 'react-router-dom' //router library, Andrei
import { Provider as ReduxProvider } from 'react-redux' //to connect store
import registerServiceWorker from './registerServiceWorker'
import theme from './theme'
import client from './apollo'
import { ApolloProvider } from 'react-apollo'
import Routes from './routes/index'

import store from './redux'

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
