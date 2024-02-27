const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 4000;

// Parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Database configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kavindu123",
  database: "test",
  port: 3306,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Handle login requests
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // For demonstration purposes, just log the received data
  console.log("Received login data:", { username, password });

  // Add your authentication logic here
  // For example, querying the database for the user

  const query = `SELECT * FROM test.abc WHERE username = ? AND password = ?`;

  connection.query(query, [username, password], (err, results) => {
    console.log(results);
    const filteredResult = results.map(({ username }) => ({ username }));
    console.log(filteredResult);
    if (err) {
      console.error("Error executing the query:", err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    if (filteredResult[0].username == username) {
      console.log(results);
      // User found, login successful
      res.status(200).json({ message: "Login successful" });
    } else {
      // User not found, login failed
      res.status(401).json({ message: "Login failed" });
    }
  });
});

app.post("/insert", (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received data to insert:", { username, password });
    const query = `INSERT INTO abc (username, password) VALUES (?,?)`;
    connection.query(query, [username, password], (err, results) => {
      console.log(results);

      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      } else {
        res.status(200).json({ message: "added" });
      }
    });
  } catch {
    console.log("erroe");
  }

  // For demonstration purposes, just log the received data
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
