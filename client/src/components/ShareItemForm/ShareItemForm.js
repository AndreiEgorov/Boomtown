import React, { Component } from 'react'

import { Form, Field } from 'react-final-form'

import ItemsContainer from '../../containers/ItemsContainer'
import { MenuItem } from '../../../node_modules/@material-ui/core';
import Menu from '@material-ui/core/Menu';


import ShareItemCard from './ShareItemCard';
import ShareButton from './ShareButton/ShareButton';
import SelectImageButton from './SelectImageButton/SelectImageButton'


const validate = values => {}
const onSubmit = values => {}
class ShareForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getData(input) {

    console.log(input.itemName)

   
}
  render() {
    return (
      <div>
      
        <ShareItemCard/>
        <h1>Share. Borrow. Prosper.</h1>
        <SelectImageButton/>
        <Form
          //  onSubmit={}
          //  validate={}
          render={({ handleSubmit, pristine, invalid, values }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="itemName"
                render={({ input, meta }) => (
                  <div>
                    <input {...input} placeholder="Name your Item" />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              />

              <Field
                name="itemDescription"
                render={({ input, meta }) => (
                  <div>
                    <textarea {...input} placeholder="Describe your Item" />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              />
              <lable>Add some tags</lable>
              <Field
                name="itemTags"
                component="select"
                >
               
          
                  
                
              </Field>
              
                
                   <ItemsContainer>
                      {({ tagData: { data, loading, error } }) => {
                        if (loading) return '...loading'
                        if (error) return '...error'
                        console.log(data)
                        const tags = data.tags
                        return tags.map((tag, index) => (
                          <option key={index} value={tag.title}>{tag.title}</option>
                        ))

                      }}
                    </ItemsContainer>

            
            </form>
          )}
         
        />
        <ShareButton/>
      </div>
    )
  }
}

export default ShareForm
