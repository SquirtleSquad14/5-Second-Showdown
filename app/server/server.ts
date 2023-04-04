const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// ---------------------ROUTES---------------------

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});