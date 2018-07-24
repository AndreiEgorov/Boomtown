import React, { Component } from 'react'

import { FormSpy, Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import ItemsContainer from '../../containers/ItemsContainer'
import { MenuItem } from '../../../node_modules/@material-ui/core'
import Menu from '@material-ui/core/Menu'

import ShareItemCard from './ShareItemCard'
import ShareButton from './ShareButton/ShareButton'
import SelectImageButton from './SelectImageButton/SelectImageButton'
import {
  resetImage,
  updateNewItem,
  resetNewItem
} from './../../redux/modules/ShareItemPreview'

const validate = values => {}
const onSubmit = values => {
  console.log(values.itemName)
}

class ShareItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileSelected: false,
      selectedTags: [],
      submitted: false
    }
  }

  getData(input) {
    console.log(input.itemName)
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.mimeType};base64, ${btoa(
            e.target.result
          )}`
        )
      }
      reader.readAsBinaryString(this.state.fileSelected)
    })
  }

  dispatchUpdate(values, tags, updateNewItem) {
    //convert an image in
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        })
      })
    }

    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    })
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    )
  }

  render() {
    const { resetImage, updateNewItem, resetNewItem } = this.props
    return (
      <ItemsContainer>
        {({ tagData: { tags, loading, error } }) => {
          if (loading) return '...loading'
          if (error) return '...error'
          return (
            <div>
              <h1>Share. Borrow. Prosper.</h1>
              <SelectImageButton />
              <Form
                onSubmit={this.onSubmit}
                //  validate={}
                render={({ handleSubmit, pristine, invalid, values }) => (
                  <form onSubmit={handleSubmit}>
                    <FormSpy
                      subscription={{ values: true }}
                      component={({ values }) => {
                        if (values) {
                          this.dispatchUpdate(values, tags, updateNewItem)
                        }
                        return ''
                      }}
                    />
                    <Field
                      name="itemName"
                      render={({ input, meta }) => (
                        <div>
                          <input {...input} placeholder="Name your Item" />
                          {meta.touched &&
                            meta.error && <span>{meta.error}</span>}
                        </div>
                      )}
                    />

                    <Field
                      name="itemDescription"
                      render={({ input, meta }) => (
                        <div>
                          <textarea
                            {...input}
                            placeholder="Describe your Item"
                          />
                          {meta.touched &&
                            meta.error && <span>{meta.error}</span>}
                        </div>
                      )}
                    />
                    <lable>Add some tags</lable>
                    <Field name="itemTags" component="select">
                      {tags &&
                        tags.map(tag => (
                          <option key={tag.id} value={tag.title}>
                            {tag.title}
                          </option>
                        ))}
                    </Field>
                  </form>
                )}
              />
              <ShareButton />
            </div>
          )
        }}
      </ItemsContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    dispatch(updateNewItem(item))
  },
  resetImage() {
    dispatch(resetImage)
  },
  resetNewItem() {
    dispatch(resetNewItem)
  }
  // ... other methods
})

export default connect(
  undefined,
  mapDispatchToProps
)(ShareItemForm)
