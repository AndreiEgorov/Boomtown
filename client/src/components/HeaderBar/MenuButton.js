import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import MoreVert from '@material-ui/icons/MoreVert'
import { Link } from 'react-router-dom'
import AuthContainer from './../../containers/AuthContainer'

class MenuButton extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state

    return (
      <div>
        <IconButton color="inherit" aria-label="Menu">
          <MoreVert
            aria-owns={anchorEl ? 'fade-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={this.handleClose} component={Link} to="/profile">
            {' '}
            Your Profile
          </MenuItem>
          {/* <MenuItem onClick={this.handleClose} component={Link} to="/welcome">Sign Out</MenuItem> */}
          <AuthContainer>
            {({ logout }) => {
              return (
                <MenuItem
                  onClick={() => {
                    logout.mutation()
                  }}
                >
                  Sign Out
                </MenuItem>
              )
            }}
          </AuthContainer>
        </Menu>
      </div>
    )
  }
}

export default MenuButton
