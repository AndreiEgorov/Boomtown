import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import BorrowButton from './BorrowButton'
import Gravatar from 'react-gravatar'
import moment from 'moment'

const styles = theme => ({
  card: {
    textAlign: 'left'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: 'blue'
  },

})

const ItemCard = ({ classes, item }) => {
  // console.log(item)

  // item.itemowner = {
  //   email:'bob@email.com'
  // }

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={item.imageurl} />
        <CardHeader
          avatar={
            <Gravatar
       
              email={item.itemowner.email}
              title={item.itemowner.fullname}
              subheader={moment(new Date(item.created)).fromNow()}
              className={classes.header}
              default="monsterid"
            />
          }
          title={item.itemowner.fullname}
          subheader={moment(new Date(item.created)).fromNow()}
          className={classes.header}
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

export default withStyles(styles)(ItemCard)
