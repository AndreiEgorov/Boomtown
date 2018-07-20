
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import Bar from './bar'

import styles from './styles'



import ItemsContainer from '../../containers/ItemsContainer';
import HeaderBar from '../../components/HeaderBar';




const Items = ({ classes }) => {
  return (
    <div>
      <HeaderBar />
      <ItemsContainer>

        {({ itemsData: { data, loading, error } }) => {
          if (loading) return '...loading'
          if (error) return '...error'
          return data.items.map((item, index) => <div key={index}>
            <h2>{item.title}</h2>
            <p>{item.tags.map(tag => tag.title)}</p>
            <p>{item.description}</p>
          </div>)
          console.log(data)
        }
        }
      </ItemsContainer>
    </div>
  )
}

export default withStyles(styles)(Items)


