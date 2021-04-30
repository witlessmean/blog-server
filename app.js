const express = require('express');
const cors = require("cors");
const adminRoutes = require("./routes/admin");
const publicViewRoutes = require("./routes/publicView");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(adminRoutes)
app.use(publicViewRoutes)



    
















const PORT = process.env.PORT || 8080;
app.listen(PORT);