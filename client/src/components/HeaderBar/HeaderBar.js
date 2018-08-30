import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
// import MoreVert from '@material-ui/icons/MoreVert'
import BoomtownLogo from '../../images/boomtown.svg'
import ShareButton from './../ShareButton'
import MenuButton from './MenuButton'
// import { Link } from 'react-router-dom'

const styles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  twoButtonsWrapper: {
    display: 'flex',
    alignItems: 'center'
  },

  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

function HeaderBar(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static" title={<img src="boomtown.svg" />}>
        <Toolbar className={classes.toolbar}>
          <div>
            <a href="/items">
              <img
                src={BoomtownLogo}
                style={{ width: '40px' }}
                alt="Boomtown Logo"
              />
            </a>
          </div>
          <div className={classes.twoButtonsWrapper}>
            <ShareButton />
            <MenuButton />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}


export default withStyles(styles)(HeaderBar)
