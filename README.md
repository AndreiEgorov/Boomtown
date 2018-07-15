# Boomtown 🏙

- Boomtown is an online application that allows user share items.
  A user may post what he/she would like to share and other users can
  select what they need from a pool of available items and borrow it for a period of time.

- An application consists of two main components: server and client.

  - Server component provides basis for the application functionality and access to the database

  - Client component helps users interact with the application: create accounts, add items
    to the pool, search and borrow avialable items.

# Technologies used

    * Server:
        Node.js
        Appollo Server
        GraphQL - to process queries to the database
        PostgresQL - as the database
        * Dev dependencies: nodemon and jest-cli

## Server

Commands must be run from the `server` directory:

### Installation

`npm install`

### Run

`npm run start:dev --prefix server`

## Client

Commands must be run from the `client` directory:

### Installation

`npm install`

### Run

`npm start`

### Build

`npm run build`
