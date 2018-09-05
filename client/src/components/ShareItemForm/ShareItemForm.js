import React, { Fragment, Component } from 'react'
import { FormSpy, Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import ItemsContainer from '../../containers/ItemsContainer'
import {
  MenuItem,
  Select,
  Checkbox,
  Button
} from '../../../node_modules/@material-ui/core'

import Lable from '@material-ui/core/FormLabel'

import {
  resetImage,
  updateNewItem,
  resetNewItem
} from './../../redux/modules/ShareItemPreview'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
// const styles = theme => ({
//   test: {
//     color: 'green'
//   }
// })
// const validate = values => {}
// const onSubmit = values => {}
const required = value => (value ? undefined : 'Required')
class ShareItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileSelected: false,
      imageurl: '',
      selectedTags: [],
      submitted: false,
      message: ''
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
    //convert an image in Base 64
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
    // const { resetImage, updateNewItem, resetNewItem } = this.props
    const { updateNewItem } = this.props
    const { fileSelected } = this.state
    const { classes } = this.props

    return (
      <ItemsContainer className={classes.test}>
        {({ addItem, tagData: { tags, loading, error } }) => {
          if (loading) return '...loading'
          if (error) return '...error'

          return (
            <div className={classes.shareFormInputView}>
              <h1 className={classes.shareFormInputViewTitle}>
                Share. Borrow. Prosper.
              </h1>

              <Form
                onSubmit={values => {
                  this.saveItem(values, tags, addItem)
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
                            className={classes.uploadButton}
                            onClick={() => {
                              fileSelected
                                ? (this.setState({ fileSelected: false }),
                                  (this.fileRef.current.value = ''),
                                  this.props.resetImage())
                                : this.fileRef.current.click()
                            }}
                          >
                            {fileSelected ? 'Reset Image' : 'Upload an Image'}
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
                      validate={required}
                      name="title"
                      render={({ input, meta }) => (
                        <div>
                          <input
                            {...input}
                            className={classes.itemNameInput}
                            placeholder="Name your Item"
                          />
                          {meta.touched &&
                            meta.error && <span>{meta.error}</span>}
                        </div>
                      )}
                    />

                    <Field
                      validate={required}
                      name="description"
                      render={({ input, meta }) => (
                        <div>
                          <textarea
                            {...input}
                            className={classes.itemDescriptionInput}
                            placeholder="Describe your Item"
                          />
                          {meta.touched &&
                            meta.error && <span>{meta.error}</span>}
                        </div>
                      )}
                    />
                    <div className={classes.selectAndLableContainer}>
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
                              {tag.title}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                    <Button
                      color="primary"
                      type="submit"
                      variant="contained"
                      disabled={pristine || invalid}
                      onClick={() =>
                        this.setState({
                          message: 'Thank you for sharing your item.'
                        })
                      }
                    >
                      SHARE
                    </Button>
                    <p>{this.state.message}</p>
                    {/* <input type="submit" value="Share" /> */}
                  </form>
                )}
              />
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
    dispatch(resetImage())
  },
  resetNewItem() {
    dispatch(resetNewItem())
  }
  // ... other methods
})

export default connect(
  undefined,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm))
