const { Pool } = require('pg')

module.exports = function(app) {
  //Adding Configuration variables and Retrieving the necessary information to connect to Postgres
  return new Pool({
    host: app.get('PG_HOST'),
    user: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    database: app.get('PG_DB'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  })
}
