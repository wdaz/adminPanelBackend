const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const verify = require('./src/validation/veryfyToken')

// Import Routers

const authRoute = require('./src/routes/auth/auth');
const userRoute = require('./src/routes/user/user');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 1000
    },
    () => console.log("connected to db")
)

// CORS Option
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


// Middleware
app.use(express.json());
app.use(cors());

// Routes Middleware
app.use('/api', authRoute);
app.use('/api/user',verify, userRoute);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Up port ${port}`))