const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Invoice = require('./Models/Invoice');
const Bussiness = require('./Models/BussinessSchema');
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

//routes
app.use('/api/invoice', Invoice);
app.use('/api/bussiness', Bussiness);

mongoose.connect(process.env.DB_connect, {
  }).then(() => {
    console.log("DB Connection Successfull");
}).catch((err) => {
    console.log(err.message);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})