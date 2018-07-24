import { withStyles } from '@material-ui/core/styles'

import React from 'react'

import styles from './styles'


import ShareItemForm from './../../components/ShareItemForm/ShareItemForm'
// import ShareItemPreview from '../../redux/modules/ShareItemPreview';
import ShareItemCard from './../../components/ShareItemForm/ShareItemCard'

const Share = ({ classes }) => {
  return (
    <div>
      <ShareItemCard/>
      <ShareItemForm/>

      <p>
        This is the share page located at <code>/share</code>.
      </p>
    </div>
  )
}

export default withStyles(styles)(Share)
