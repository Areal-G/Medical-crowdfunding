import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.mjs";

const app = express();

app.use(express.json());
app.use(routes); // route from routes.index

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
