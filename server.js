const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist/`));

app.listen(PORT, () => {
    console.log(`Example app started on http://localhost:${PORT}/`);
});
