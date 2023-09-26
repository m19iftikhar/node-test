const { PrismaClient } = require("@prisma/client");

module.exports.addProduct = async (req, res) => {
  const { price, name } = req.body;
  const prisma = new PrismaClient();

  try {
    const newProduct = await prisma.product.create({
      data: {
        price: price,
        name: name,
      },
    });

    res.status(201).json({ message: "Product Added", data: newProduct });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

module.exports.getProduct = async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const products = await prisma.product.findMany();

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

module.exports.updateProduct = async (req, res) => {
  const prisma = new PrismaClient();
  const { price, name, id } = req.body;

  try {
    const products = await prisma.product.update({
      where: { id },
      data: {
        price: price,
        name: name,
      },
    });

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

module.exports.deleteProduct = async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params;

  try {
    const products = await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
};
