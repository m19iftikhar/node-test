const express = require("express");
const authRoutes = require("./controller/auth");
const productRoutes = require("./controller/product");
const invoiceRoutes = require("./controller/invoice");

const app = express();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", invoiceRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
