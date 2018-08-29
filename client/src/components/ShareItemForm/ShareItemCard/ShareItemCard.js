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
import ItemCard from './../../ItemCard/'


import { connect } from 'react-redux'

const styles = theme => ({
  card: {
    textAlign: 'left',
    maxWidth: '400px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: 'grey'
  },

  avatar: {
    backgroundColor: red[500]
  }
})
//passing initial props before connecting to redux.(keep this comment for future reference)
// const item = {
//   itemwoner: {
//     fullname: 'Item Owner Name'
//   },
//   title: 'Name your item',
//   tags:[],
//   description: 'Describe your item'
// }

const ShareItemCard = props => {
  return <ItemCard item={props.shareItemPreview} />
}

ShareItemCard.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  return {
    shareItemPreview: state.shareItemPreview
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ShareItemCard))
