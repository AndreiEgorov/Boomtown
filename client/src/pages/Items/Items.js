import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import Bar from './bar'

import styles from './styles'

import ItemsContainer from '../../containers/ItemsContainer'
import HeaderBar from '../../components/HeaderBar'
import ItemCard from '../../components/ItemCard'

import Grid from '@material-ui/core/Grid'

const Items = ({ classes }) => {
  return (
    <div >
      <HeaderBar />

      <Grid
        container
        align="center"
        justify="center"
        className={classes.gridContainer}
      >
        <ItemsContainer>
          {({ itemsData: { data, loading, error } }) => {
            if (loading) return '...loading'
            if (error) return '...error'
            const items = data.items
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
    </div>
  )
}

export default withStyles(styles)(Items)
