import Dotenv from 'dotenv';

Dotenv.config();

const env = process.env.NODE_ENV; // 'dev' or 'prod'

const dev = {
  app: {
    host: "127.0.0.1",
    port: 3000
  }
}

const prod = {
  app: {
    host: "0.0.0.0",
    port: 80
  }
}

const config = {
  dev,
  test
}

module.exports = config[env];
