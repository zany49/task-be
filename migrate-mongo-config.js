// In this file you can configure migrate-mongo

const config = {
  mongodb: {
    url: process.env.MONGO_DB,
    databaseName: 'interview-task',

    options: {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    }
  },

  migrationsDir: "migrations",

  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'esm',
};

export default config;
