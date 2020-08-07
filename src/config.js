module.exports = {
  db_config: {
    connectionString: "mongodb://localhost:27017/myapp",
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
