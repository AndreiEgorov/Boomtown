const { AuthenticationError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2
  })
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user // Omit the password from the token

  return jwt.sign({ id, email, fullname, bio }, secret, {
    expiresIn: '2h'
  })
}

module.exports = function(app) {
  return {
    async signup(parent, args, context) {
      try {
        // generate a cryptographic hash to conceal the user's password before storing it.
        const hashedPassword = await bcrypt.hash(args.user.password, 10)
        // -------------------------------
        //connects to a query that adds a new user
        const user = await context.pgResource.createUser({
          fullname: args.user.fullname,
          email: args.user.email,
          password: hashedPassword
        })

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        })

        return true
      } catch (e) {
        throw new AuthenticationError(e)
      }
    },

    async login(parent, args, context) {
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.user.email
        )
        // Use bcrypt to compare the provided password to 'hashed' password stored in your database.
        const valid = await bcrypt.compare(args.user.password, user.password)
        // -------------------------------
        if (!valid || !user) throw 'User was not found.'

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        })

        return true
      } catch (e) {
        throw new AuthenticationError(e)
      }
    },

    logout({ parent, args, context }) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'))
      return true
    }
  }
}
