
const express = require('express');
const port = 3000;
let app = express();
let controller = require("./controller.js");

app.get("/", (req, res) => {
    controller.response(res);
});

app.listen(port, () => (console.log("Server on localhost:"+port)));
