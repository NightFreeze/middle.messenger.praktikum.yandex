const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.static('./dist'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});