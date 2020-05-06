const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const verify = require('./validation/veryfyToken')

// Import Routers
app.get('/', (req, res) => {
    res.send("hello word necesen")
})

const authRoute = require('./routes/auth/auth');
const userRoute = require('./routes/user/user');

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

// Middleware
app.use(express.json())

// Routes Middleware
app.use('/api', authRoute)
app.use('/api/user',verify, userRoute)


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Up port ${port}`))