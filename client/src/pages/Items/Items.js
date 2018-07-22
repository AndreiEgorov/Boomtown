
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import Bar from './bar'

import styles from './styles'



import ItemsContainer from '../../containers/ItemsContainer';
import HeaderBar from '../../components/HeaderBar';
import ItemCard from '../../components/ItemCard';



const Items = ({ classes }) => {
  return (
    <div>
      <HeaderBar/>
      
      <ItemsContainer>
      
        {({ itemsData: { data, loading, error } }) => {
          if (loading) return '...loading'
          if (error) return '...error'
          const items = data.items
          return items.map((item, index) => <div key={index}>
            <ItemCard item={item}/>
          </div>)
        }

        

        }
        
      </ItemsContainer>
      
    </div>
  )
}

export default withStyles(styles)(Items)


