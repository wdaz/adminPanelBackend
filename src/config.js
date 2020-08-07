module.exports = {
  db_config: {
    connectionString: "mongodb+srv://magic:Ruslan0224@adminpaneldb-9eem7.mongodb.net/<myapp>?retryWrites=true&w=majority",
    configuration: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 1000,
    },
  },
  cors_options: {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  TOKEN_SECRET: "topSecret01",
};
