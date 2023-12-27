/* const express = require('express');
const server = express();

server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

        next();
    });

const sqlite3 = require('sqlite3').verbose();
server.get('/users',(req, res)=> {



const db = new sqlite3.Database('gik339-17-projekt.db');
console.log(db)

db.all('SELECT * FROM users', (err, rows)=> {
    if (err){
        res.status(500).send(err);
    }
    else {
        res.send(rows);
    }
});

db.close();
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
}); */




const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const server = express();
const PORT = 3000;

const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Middleware to parse JSON bodies
server.use(express.json());

// Define API Routes

// GET all resources
server.get('/resurs', (req, res) => {
  db.all('SELECT * FROM your_table', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ resources: rows });
  });
});

// POST - Create a new resource
server.post('/resurs', (req, res) => {
  const { property1, property2 } = req.body; // Extract data from request body
  db.run(`INSERT INTO your_table (column1, column2) VALUES (?, ?)`, [property1, property2], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'New resource created', id: this.lastID });
  });
});

// PUT - Update a resource
server.put('/resurs/:id', (req, res) => {
  const { property1, property2 } = req.body;
  const id = req.params.id;
  db.run(`UPDATE your_table SET column1 = ?, column2 = ? WHERE id = ?`, [property1, property2, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Resource with ID ${id} updated successfully` });
  });
});

// DELETE - Delete a resource by ID
server.delete('/resurs/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM your_table WHERE id = ?`, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Resource with ID ${id} deleted successfully` });
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Database setup (create a table)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS your_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    column1 TEXT,
    column2 TEXT
  )`);
});
