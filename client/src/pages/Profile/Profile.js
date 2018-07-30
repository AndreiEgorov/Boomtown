import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import styles from './styles'

import HeaderBar from './../../components/HeaderBar/HeaderBar'

import ItemCard from '../../components/ItemCard'
import Grid from '@material-ui/core/Grid'
import ItemsContainer from '../../containers/ItemsContainer'
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar'
import moment from 'moment'
import {
  CardHeader,
  Card,
  Avatar
} from '../../../node_modules/@material-ui/core'

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
          {({
            userItemsData: {
              data: { user },
              loading,
              error
            }
          }) => {
            if (loading) return '...loading'
            if (error) return '...error'
            const { items } = user

            console.log(user)

            return (
              <div>
                <Card>
                  <Avatar>
                    <Gravatar
                      email={user.email}
                      default="monsterid"
                    />
                  </Avatar>
                  <Typography>
                  {user.fullname}
                  </Typography>
                  <Typography>
                  {user.items.length} Items shared {user.borrowed.length} Items borrowed
                  </Typography>
                  <Typography>
                  {user.bio}
                  </Typography>
                  
                </Card>


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
                </div>
              </div>
            )
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
