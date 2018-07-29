import React, { Fragment, Component } from 'react'

import { FormSpy, Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import ItemsContainer from '../../containers/ItemsContainer'
import {
  MenuItem,
  Select,
  Checkbox,
  Button,
  

} from '../../../node_modules/@material-ui/core'
import Menu from '@material-ui/core/Menu'
import Lable from '@material-ui/core/FormLabel'

import ShareItemCard from './ShareItemCard'
import ShareButton from './ShareButton/ShareButton'
import SelectImageButton from './SelectImageButton/SelectImageButton'
import {
  resetImage,
  updateNewItem,
  resetNewItem
} from './../../redux/modules/ShareItemPreview'
import { withStyles } from '@material-ui/core/styles';
// import styles from './styles'





const styles = theme => ({


  test:{
    background:"green"
  }
})







const validate = values => {}
const onSubmit = values => {
  console.log(values.itemName)
}

class ShareItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileSelected: false,
      imageurl: '',
      selectedTags: [],
      submitted: false
    }
    this.fileRef = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    console.log('Controlled in:' + values)
  }

  handleImageSelect = event => {
    this.setState({ fileSelected: event.target.files[0] })
  }

  handleCheckbox(event) {
    this.setState({
      selectedTags: event.target.value
    })
  }

  async saveItem(values, tags, addItem) {
    const {
      validity,
      files: [file]
    } = this.fileRef.current
    if (!validity.valid) return
    try {
      const itemData = {
        ...values,
        tags: this.applyTags(tags)
      }
      await addItem.mutation({
        variables: {
          item: itemData,
          image: file
        }
      })
      this.setState({ done: true })
    } catch (e) {
      console.log(e)
    }
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
    if (!values.imageUrl && this.state.fileSelected) {
      this.getBase64Url().then(imageUrl => {
        updateNewItem({
          imageUrl
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
    const { fileSelected } = this.state
    const  {classes} = this.props
   
    return (
      <ItemsContainer className={classes.test}>
        {({ addItem, tagData: { tags, loading, error } }) => {
          if (loading) return '...loading'
          if (error) return '...error'
          console.log('Andrei add item', addItem)
          return (
            <div>
              <h1>Share. Borrow. Prosper.</h1>
              <SelectImageButton />
              <Form
                onSubmit={values => {
                  this.saveItem(values, tags, addItem)
                  console.log('Andrei', values, addItem)
                }}
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

                    <Field name="imageurl">
                      {(input, meta) => (
                        <Fragment>
                          <Button
                            onClick={() => {
                              fileSelected
                                ? (this.setState({ fileSelected: false }),
                                  (this.fileRef.current.value = ''),
                                  this.props.resetImage())
                                : this.fileRef.current.click()

                              //TODO if i clikc and there is an iage
                              //selected already clear the image from the state
                              //and start over
                            }}
                          >
                            {' '}
                            {fileSelected
                              ? 'Reset Image'
                              : 'Upload an Image'}{' '}
                          </Button>
                          <input
                            onChange={e => this.handleImageSelect(e)}
                            type="file"
                            accept="image/*"
                            hidden
                            ref={this.fileRef}
                          />
                        </Fragment>
                      )}
                    </Field>

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
                    <Lable>Add some tags</Lable>

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
                    <input type="submit" value="Share" />
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
)(withStyles(styles)(ShareItemForm))
