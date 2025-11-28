const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// FILE PATH
const filePath = "./users.json";

// Ensure the file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

// ROUTE TO SAVE USER
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, age, email, password, phone, address } = req.body;

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      age,
      email,
      password: hashedPassword,
      phone,
      address
    };

    // READ CURRENT USERS
    let users = JSON.parse(fs.readFileSync(filePath));

    // ADD NEW USER
    users.push(newUser);

    // SAVE BACK TO FILE
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.json({ message: "User registered successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving user" });
  }
});

// START SERVER
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
