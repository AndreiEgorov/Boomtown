import React, { Component } from 'react'

import { FormSpy, Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import ItemsContainer from '../../containers/ItemsContainer'
import {
  MenuItem,
  Select,
  Checkbox
} from '../../../node_modules/@material-ui/core'
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

  handleCheckbox(event) {
    this.setState({
      selectedTags: event.target.value
    })
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ')
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
                onSubmit={onSubmit}
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
                      name="title"
                      render={({ input, meta }) => (
                        <div>
                          <input {...input} placeholder="Name your Item" />
                          {meta.touched &&
                            meta.error && <span>{meta.error}</span>}
                        </div>
                      )}
                    />

                    <Field
                      name="description"
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

                    <Select
                      multiple
                      value={this.state.selectedTags}
                      onChange={e => this.handleCheckbox(e)}
                      renderValue={selected => {
                        return this.generateTagsText(tags, selected)
                      }}
                    >
                      {tags &&
                        tags.map(tag => (
                          <MenuItem key={tag.id} value={tag.id}>
                            <Checkbox
                              checked={
                                this.state.selectedTags.indexOf(tag.id) > -1
                              }
                            />
                            {/* <ListItemText primary={tag.title} /> */}
                            {tag.title}
                          </MenuItem>
                        ))}
                    </Select>
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
