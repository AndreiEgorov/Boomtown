import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddCircle from '@material-ui/icons/AddCircle'
import { Link } from 'react-router-dom'
import styles from './styles'

function ShareButton(props) {
  const { classes } = props

  return (
    <div>
      <Button
        variant="extendedFab"
        aria-label="Delete"
        className={classes.button}
        component={Link}
        to="/share"
      >
        <AddCircle className={classes.circle} />
        Share Something
      </Button>
    </div>
  )
}

export default withStyles(styles)(ShareButton)
