const userRouter = require('./src/routes/user.routes');

const express = require("express");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/user', userRouter);


app.use((err, req, res, next) => {
  console.log({ err });
  err.status = err.status || 400;
  res.status(err.status).send({ errorMessage: err.message });
})

app.listen(process.env.PORT, () => {
  console.log(`http://127.0.0.1:${process.env.PORT}`);
});
