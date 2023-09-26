const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res) => {
  const prisma = new PrismaClient();

  const { email, password, name } = req.body;

  const user = await prisma.user.findFirst({ where: { email: email } });

  // Check if the username is already taken
  if (user) {
    return res.status(400).json({ message: "Username already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const users = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Signup successful", data: users });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

module.exports.Login = async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const { email, password } = req.body;

    let user = await prisma.user.findFirst({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
      expiresIn: "1h", // Token expiration time
    });

    user.token = token;

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  } finally {
    await prisma.$disconnect();
  }
};
