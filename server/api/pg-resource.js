var strs = require('stringstream')

function tagsQueryString(tags, itemid, result) {
  const length = tags.length
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        )
}

module.exports = function(postgres) {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *', //add a query to add a user
        values: [fullname, email, password]
      }
      try {
        const user = await postgres.query(newUserInsert)
        return user.rows[0]
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.'
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.'
          default:
            throw 'There was a problem creating your account.'
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email LIKE $1', // @TODO: Authentication - Server
        values: [email]
      }
      try {
        const user = await postgres.query(findUserQuery)
        if (!user) throw 'User was not found.'
        return user.rows[0]
      } catch (e) {
        throw 'User was not found.'
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: `select * from users where id = $1`,
        values: [id]
      }

      const user = await postgres.query(findUserQuery)
      return user.rows[0]
    },

    async getItems(idToOmit) {
      let text = `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
      FROM items item
      INNER JOIN uploads up
      ON up.itemid = item.id`
      if (idToOmit) {
        text = `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
          FROM items item
          INNER JOIN uploads up
          ON up.itemid = item.id
          WHERE item.ownerid <> $1 AND item.borrowerid IS NULL 
          ORDER BY item.created DESC`
      }

      const items = await postgres.query({
        text: text,
        values: idToOmit ? [idToOmit] : []
      })

      return items.rows
    },
    async getItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
        FROM items item
        INNER JOIN uploads up
        ON up.itemid = item.id
        WHERE ownerid = $1`,

        values: [id]
      })
      return items.rows
    },
    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `select * from items where borrowerid = $1`,
        values: [id]
      })
      return items.rows
    },
    async getTags() {
      const tags = await postgres.query('select * from tags')
      return tags.rows
    },

    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT id,title,itemtags from itemtags INNER JOIN tags on itemtags.tagid = tags.id where itemid = $1;`, // @TODO: Advanced queries
        values: [id]
      }

      const tags = await postgres.query(tagsQuery)
      return tags.rows
    },

    async saveNewItem({ item, image, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query('BEGIN', err => {
              // Convert image (file stream) to Base64
              const imageStream = image.stream.pipe(strs('base64'))

              let base64Str = 'data:image/*;base64, '
              imageStream.on('data', data => {
                base64Str += data
              })

              imageStream.on('end', async () => {
                // Image has been converted, begin saving things
                const { title, description, tags } = item

                const newItemQuery = {
                  text: `INSERT INTO items (title, description,ownerid) VALUES( $1, $2, $3 )RETURNING *`,
                  values: [title, description, user.id]
                }

                const newItem = await client.query(newItemQuery)
                const itemid = newItem.rows[0].id

                const imageUploadQuery = {
                  text:
                    'INSERT INTO uploads (itemid, filename, mimetype, encoding, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  values: [
                    itemid,
                    image.filename,
                    image.mimetype,
                    'base64',
                    base64Str
                  ]
                }
                // Upload image
                const uploadedImage = await client.query(imageUploadQuery)
                const imageid = uploadedImage.rows[0].id

                const tagsQuery = {
                  text: `INSERT INTO itemtags (tagid, itemid) VALUES ${tagsQueryString(
                    [...tags],
                    itemid,
                    ''
                  )}`,
                  values: tags.map(tag => tag.id)
                }

                await client.query(tagsQuery)

                // Commit the entire transaction!
                client.query('COMMIT', err => {
                  if (err) {
                    throw err
                  }
                  // release the client back to the pool
                  done()
                  // Uncomment this resolve statement when you're ready!
                  resolve(newItem.rows[0])
                  // -------------------------------
                })
              })
            })
          } catch (e) {
            // Something went wrong
            client.query('ROLLBACK', err => {
              if (err) {
                throw err
              }
              // release the client back to the pool
              done()
            })
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.'
              default:
                throw e
            }
          }
        })
      })
    }
  }
}
