const express = require('express');

const userRouter = require('./src/routes/user.routes');

const app = express();
app.use(express.json());
require('dotenv').config();

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  console.log({ err });
  err.code = err.code || 400;
  res.status(err.code).send({ errorMessage: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`http://127.0.0.1:${process.env.PORT}`);
});
