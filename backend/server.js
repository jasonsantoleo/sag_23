require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});