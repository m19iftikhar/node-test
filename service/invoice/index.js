const { PrismaClient } = require("@prisma/client");

module.exports.postInvoice = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const { userid, productids } = req.body;
    const invoice = await prisma.invoice.create({
      data: {
        userid: req.user.id,
        productids: productids,
      },
    });
    res.json(invoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getInvoice = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const { id } = req.params;
    const invoice = await prisma.invoice.findFirst({ where: { id: id } });
    res.json(invoice);
  } catch (error) {
    console.error("Error getting invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
