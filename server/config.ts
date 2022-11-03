const config = {
  dbHost: process.env.DB_HOST
    ? process.env.DB_HOST
    : 'localhost',

  dbName: process.env.DB_NAME
    ? process.env.DB_NAME
    : 'okane',

  dbPort: process.env.DB_PORT
    ? parseInt(process.env.DB_PORT)
    : 5432,

  serverPort: process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT)
  : 3001, 
}

export default config;