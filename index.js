const express = require('express')
const app = express();
const port = 8000
const bodyParser = require('body-parser');
const routeHandler = require('./Routes');

const router = routeHandler();
app.use(bodyParser.json())

app.use(router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))