
const express = require('express');
const routes = require("./routes");
const port = 8000;
let app = express();

app.use("/",routes)
app.listen(8000, () => (console.log("Server on localhost:"+port)));

