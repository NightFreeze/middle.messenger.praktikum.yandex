const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist/`));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});
