import React from 'react'
import { withStyles, Grid } from '@material-ui/core'

import styles from './styles'

import ShareItemForm from './../../components/ShareItemForm/ShareItemForm'
// import ShareItemPreview from '../../redux/modules/ShareItemPreview';
import ShareItemCard from './../../components/ShareItemForm/ShareItemCard'
import HeaderBar from './../../components/HeaderBar'

class Share extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.sharePageWrapper}>
        <HeaderBar />
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.sharePageGrid}
        >
          <Grid item xs={6}>
            <ShareItemCard />
          </Grid>
          <Grid item xs={6}>
            <ShareItemForm />
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default withStyles(styles)(Share)
