import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import styles from './styles'
import HeaderBar from './../../components/HeaderBar/HeaderBar'
import ItemCard from '../../components/ItemCard'
import Grid from '@material-ui/core/Grid'
import ItemsContainer from '../../containers/ItemsContainer'
import Typography from '@material-ui/core/Typography'
import Gravatar from 'react-gravatar'
import { Card, Avatar } from '../../../node_modules/@material-ui/core'

const Profile = ({ classes }) => {
  return (
    <div>
      <HeaderBar />
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
          return (
            <div>
              <Grid
                container
                align="center"
                justify="center"
                className={classes.gridContainer}
              >
                <div className={classes.headerBoxWrapper}>
                  <div className={classes.headerBox}>
                    <Card className={classes.smallInnerBox}>
                      <Avatar>
                        <Gravatar email={user.email} default="monsterid" />
                      </Avatar>
                      <Typography>{user.fullname}</Typography>
                      <Typography>
                        {user.items.length} Items shared {user.borrowed.length}{' '}
                        Items borrowed
                      </Typography>
                      <Typography>{user.bio}</Typography>
                    </Card>
                  </div>
                </div>
                <div className={classes.boxOfCards}>
                  {items.map((item, index) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                      className={classes.cardCell}
                    >
                      <ItemCard item={item} />
                    </Grid>
                  ))}
                </div>
              </Grid>
            </div>
          )
        }}
      </ItemsContainer>
    </div>
  )
}

export default withStyles(styles)(Profile)
