import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
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
  },
  test: {
    background: 'blue'
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
  return (
    <div>
      <ItemCard item={props.shareItemPreview} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    shareItemPreview: state.shareItemPreview
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ShareItemCard))
