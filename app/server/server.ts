const express = require('express');
const path = require('path')
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../client')))

// ---------------------ROUTES---------------------


// error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});