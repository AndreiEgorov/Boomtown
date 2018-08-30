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
        <HeaderBar className={classes.headerBar} />

        <div className={classes.componentsOuterWrapper}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.componentsInnerWrapper}
            // className={classes.sharePageGrid}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              className={classes.shareItemCardWrapper}
            >
              <ShareItemCard />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              className={classes.shareItemFormWrapper}
            >
              <ShareItemForm />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Share)
