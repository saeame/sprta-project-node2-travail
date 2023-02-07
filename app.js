const userRouter = require('./src/routes/user.routes');
const productRouter = require('./src/routes/product.routes');
const orderRouter = require('./src/routes/order.routes');
const cartRouter = require('./src/routes/cart.routes');
const addressRouter = require('./src/routes/address.routes');
const express = require('express');
const cookieParser = require('cookie-parser');
const ejsRouter = require('./src/routes/ejs.routes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(ejsRouter);

app.use('/user', [userRouter, addressRouter]);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.use((err, req, res, next) => {
  console.log({ err });
  err.status = err.status || 400;
  return res.status(err.status).send({ errorMessage: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`http://127.0.0.1:${process.env.PORT}`);
});
