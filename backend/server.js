require("dotenv").config()
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const planRoutes = require('./routes/plans');
const authRoutes = require('./routes/auth');
const pinsRoutes = require('./routes/pins');

const tokenVerification = require('./middleware/tokenVerification')

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/pins', pinsRoutes);
require('./db')

const port = process.env.PORT || 3001
app.listen(port, () => console.log("Serwer nasłuchuje na porcie " + port))