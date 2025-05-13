const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoConnString = process.env.MONGO;

mongoose.connect(mongoConnString, {
    useNewUrlParser: true})
        .then((result) => {
            console.log("Połączono z bazą")
        })
        .catch((err) =>{
            console.log("Błąd podczas łączenia z bazą danych: " + err) 
        })