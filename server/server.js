// khoi tao server
const express = require("express");
const app = express();

// require cac package
const bodyParser = require("body-parser");
const port = 4444;
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");

// import routes
const userRoutes = require("./routes/users.routes");
const blogRoutes = require("./routes/blogs.routes");

// su dung cac package
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));

// setup routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
