const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'freedb.tech',
    user: env.DB_USER || 'freedbtech_chriskangchriskang',
    password: env.DB_PASSWORD || 'tango',
    database: env.DB_NAME || 'freedbtech_testdatabasehere',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;