const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index.js");
const cors = require("cors");
const { PORT, DB_URI } = require("./config.js");

const app = express();
app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes); // route from routes.index

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

const schema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const Customer = mongoose.model("Customer", schema);

findCustomer();

async function findCustomer() {
  const customer = await Customer.findOne({ username: "areal" }).exec();
  console.log("Customer:", customer);
}

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
