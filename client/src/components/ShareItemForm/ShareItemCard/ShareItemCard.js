import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import BorrowButton from './../../ItemCard/BorrowButton'

const styles = theme => ({
  
  card: {
    textAlign: 'left',
    maxWidth: '400px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: 'grey',
  
  },

  avatar: {
    backgroundColor: red[500]
  }
})

const ShareItemCard = ({ classes, item }) => {
  console.log(item)

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Contemplative Reptile"
        />
        
     
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />

        <CardContent>
          <Typography variant="title">{''}</Typography>
          <Typography variant="body1">
            {''}
          </Typography>
          <Typography variant="subheading">{''}</Typography>
        </CardContent>
        <BorrowButton />
      </Card>
    </div>
  )
}

ShareItemCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ShareItemCard)
