const { ApolloError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const authMutations = require('./auth')
const { UploadScalar, DateScalar } = require('../custom-types')

module.exports = function(app) {
  return {
    Upload: UploadScalar,
    // Date: DateScalar,
    Query: {
      viewer(parent, args, context, info) {
        if (context.token) {
          return jwt.decode(context.token, app.get('JWT_REQUIRED'))
        }
        return null
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id)
          return user
        } catch (e) {
          throw new ApolloError(e)
        }
      },

      async items(parent, { filter }, { pgResource }, info) {
        try {
          const items = await pgResource.getItems(filter)
          return items
        } catch (e) {
          throw new ApolloError(e)
        }
      },

      async tags(parent, args, { pgResource }, info) {
        try {
          const tags = await pgResource.getTags()
          return tags
        } catch (e) {
          throw new ApolloError(e)
        }
      }
    },

    User: {
      async items(parent, args, { pgResource }, info) {
        try {
          const items = await pgResource.getItemsForUser(parent.id)
          return items
        } catch (e) {
          throw new ApolloError(e)
        }
      },

      async borrowed(parent, args, { pgResource }, info) {
        try {
          const borrowed = await pgResource.getBorrowedItemsForUser(parent.id)
          return borrowed
        } catch (e) {
          throw new ApolloError(e)
        }
      }
    },

    Item: {
      async itemowner(parent, id, { pgResource }, info) {
        try {
          const owner = await pgResource.getUserById(parent.ownerid)
          return owner
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      async tags(parent, args, { pgResource }, info) {
        // correct tags for the queried Item from Postgres
        try {
          const tags = await pgResource.getTagsForItem(parent.id)
          return tags
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      async borrower(parent, args, { pgResource }, info) {
        /**
         * correct user from Postgres
         * or null in the case where the item has not been borrowed.
         */
        try {
          const user = await pgResource.getUserById(parent.borrowerid)
          return user
        } catch (e) {
          throw new ApolloError(e)
        }
      }
      // async imageurl({ imageurl, imageid, mimetype, data }) {
      //   if (imageurl) return imageurl
      //   if (imageid) {
      //     return `data:${mimetype};base64, ${data}`
      //   }
      // }
      // -------------------------------
    },

    Mutation: {
      ...authMutations(app),

      async addItem(parent, args, context, info) {
        const image = await args.image
        const user = await jwt.decode(context.token, app.get('JWT_SECRET'))
        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          image: image,
          user
        })
        return newItem
      }
    }
  }
}
