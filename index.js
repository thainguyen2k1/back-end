import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.js";

const app = express();
const PORT = 8888;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/f8-k10")
  .then(() => {
    console.log("Connect database successfully!");
  })
  .catch((error) => {
    console.error(`Connect failed: ${error}`);
  });

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).exec();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id).exec();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

app.post("/products", async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

app.patch("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const options = { new: true };
    const productUpdate = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      productUpdate,
      options
    ).exec();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
