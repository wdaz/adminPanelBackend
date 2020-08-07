const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config.js')


// Import Routers
const routers = require('./routes/routes')

// Connect to DB
mongoose.connect(
    config.db_config.connectionString,
    config.db_config.configuration,
    () => console.log("connected to db")
)

// CORS Option

// config.cors_options

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api', routers)



const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server Up port http://localhost:${port}`))