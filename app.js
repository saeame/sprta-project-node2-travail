const express = require("express");

const app = express();
app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`http://127.0.0.1:${process.env.PORT}`);
});
