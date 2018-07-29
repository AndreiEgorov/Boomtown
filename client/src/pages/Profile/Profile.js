import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import styles from './styles'



import HeaderBar from './../../components/HeaderBar/HeaderBar'

import ItemCard from '../../components/ItemCard'
import Grid from '@material-ui/core/Grid'
import ItemsContainer from '../../containers/ItemsContainer'

const Profile = ({ classes }) => {
  return (
    <div>
    <HeaderBar />


<Grid
        container
        align="center"
        justify="center"
        className={classes.gridContainer}
      >
<ItemsContainer>
          {({ userItemsData: { data: {user}, loading, error } }) => {
            if (loading) return '...loading'
            if (error) return '...error'
const {items} = user
            return (
              <div className={classes.boxOfCards}>
            {items.map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                className={classes.cardCell}
              >
                <ItemCard item={item} />
              </Grid>
            ))}
            </div>)
          }}
        </ItemsContainer>
      </Grid>




      <p>
        This is the profile page located at <code>/profile/:userId</code>.
      </p>
    </div>
  )
}

export default withStyles(styles)(Profile)








