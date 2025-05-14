require("dotenv").config()
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const tripRoutes = require('./routes/trips');
const authRoutes = require('./routes/login');
const tokenVerification = require('./middleware/tokenVerification')

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use('/api/login', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/trips', tripRoutes);

require('./db')

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Serwer nasłuchuje na porcie " + port))