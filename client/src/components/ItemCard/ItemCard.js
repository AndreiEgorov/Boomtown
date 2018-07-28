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
import BorrowButton from './BorrowButton'

const styles = theme => ({
  
  card: {
    textAlign: 'left',
    width: "400px",
  },
  media: {
    
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: 'blue'
  },

  avatar: {
    backgroundColor: red[500]
  }
})

const ItemCard = ({ classes, item }) => {
  console.log(item)

  return (
    <div >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={item.imageUrl}
          
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
          <Typography variant="title">{item.title}</Typography>
          <Typography variant="body1">
            {item.tags.map(tag => tag.title)}
          </Typography>
          <Typography variant="subheading">{item.description}</Typography>
        </CardContent>
        <BorrowButton />
      </Card>
    </div>
  )
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemCard)
