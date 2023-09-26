const express = require("express");
const { postInvoice, getInvoice } = require("../../service/invoice");
const { authenticateToken } = require("../../middleware");
const invoiceRoutes = express.Router();

invoiceRoutes.post("/invoice", authenticateToken, postInvoice);
invoiceRoutes.get("/invoice", authenticateToken, getInvoice);

module.exports = invoiceRoutes;
