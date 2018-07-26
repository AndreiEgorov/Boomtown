const { ApolloServer } = require('apollo-server')
const { apolloUploadExpress } = require('apollo-upload-server')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('../api/schema')
let resolvers = require('../api/resolvers')
const {AuthDirective} =  require('../api/custom-directives')
module.exports = function ({ app, pgResource }) {
  resolvers = resolvers(app)
  /**
   * Andrei's Comments:  makeExecutableSchema is used to  Initialize Apollo Server
   * Once the schema types are defined, it's time to wire up the schema
   * to the resolving functions. The 'makeExecutableSchema' function is provided by the 'graphql-tools' package.
   */

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
