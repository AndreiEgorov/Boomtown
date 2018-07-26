const { ApolloServer } = require('apollo-server')
const { apolloUploadExpress } = require('apollo-upload-server')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('../api/schema')
let resolvers = require('../api/resolvers')
const {AuthDirective} =  require('../api/custom-directives')
module.exports = function ({ app, pgResource }) {
  resolvers = resolvers(app)

  /**
   * Andrei's Comments: Initialize Apollo Server
   *
   * Once you've defined your schema types, it's time to wire up your schema
   * to your resolving functions. This is Apollo magic, and it's done using
   * the 'makeExecutableSchema' function provided by the 'graphql-tools' package.
   *
   * https://www.apollographql.com/docs/apollo-server/v2/api/graphql-tools.html#makeExecutableSchema
   */

  // @TODO: Refactor to use 'makeExecutableSchema' to wire up your schema to your resolvers:
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives:{
      auth: AuthDirective
    }
  })
  // -------------------------------

  const apolloServer = new ApolloServer({
    context: ({ req }) => {
      // @Done: Uncomment this later when we add auth (to be added to Apollo's context)
      const tokenName = app.get("JWT_COOKIE_NAME")
      const token = req ? req.cookies[tokenName] : undefined

      return {
        req,
        token,
        pgResource
      }
    },
    schema
  })

  apolloServer.applyMiddleware({
    app,
    uploads: true,
    // @TODO: Add the CORS_CONFIG from your application configuration
    cors: app.get('CORS_CONFIG'),
    // -------------------------------
    uploads: apolloUploadExpress({
      maxFileSize: 10000000 // 10mb
    })
  })
}
