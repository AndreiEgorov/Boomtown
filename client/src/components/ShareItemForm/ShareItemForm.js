import React, { Component } from 'react'

import { Form, Field } from 'react-final-form'

import ItemsContainer from '../../containers/ItemsContainer'


const validate = values => {}
const onSubmit = values => {}
class ShareForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  //place for getData function

  render() {
    return (
      <div>
        <h1>Share. Borrow. Prosper.</h1>

        <ItemsContainer>
          {({ tagData: { data, loading, error } }) => {
            if (loading) return '...loading'
            if (error) return '...error'
            console.log(data)
            const tags = data.tags
            return tags.map((tag, index) => (
            <p key={index}>{tag.title}</p>
            ))
          }}
        </ItemsContainer>

        
      </div>
    )
  }
}

export default ShareForm
