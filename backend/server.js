require("dotenv").config()
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const planRoutes = require('./routes/plans');
const authRoutes = require('./routes/login');
const registerRoute = require('./routes/register')
const tokenVerification = require('./middleware/tokenVerification')

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.get("/api/users",tokenVerification)
app.use('/api/login', authRoutes);
app.use('/api/register', registerRoute)
app.use('/api/user', userRoutes);
app.use('/api/plans', planRoutes);

require('./db')

const port = process.env.PORT || 3001
app.listen(port, () => console.log("Serwer nasłuchuje na porcie " + port))