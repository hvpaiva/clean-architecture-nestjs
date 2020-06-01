const connection = process.env.DB_CONNECTION;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const environment = process.env.NODE_ENV;

module.exports = {
  type: connection,
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,

  entities: ['dist/infrastructure/database/mapper/*.js'],

  synchronize: false,

  logging: true,
  logger: 'file',

  migrationsRun: environment === 'test', // I prefer to run manually in dev
  migrationsTableName: 'migrations',
  migrations: ['dist/infrastructure/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
  },
};
