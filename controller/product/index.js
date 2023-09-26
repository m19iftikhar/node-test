const express = require("express");
const {
  deleteProduct,
  updateProduct,
  addProduct,
  getProduct,
} = require("../../service/product");
const productRoutes = express.Router();

productRoutes.post("/product", addProduct);
productRoutes.put("/product", updateProduct);
productRoutes.delete("/product", deleteProduct);
productRoutes.get("/product", getProduct);

module.exports = productRoutes;
