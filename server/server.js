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
server.get('/cars', (req, res) => {
  db.all('SELECT * FROM cars', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ resources: rows });
  });
});

// POST - Create a new resource
server.post('/cars', (req, res) => {
  const { model, year, gear, fuel, color, mileage} = req.body; 
  db.run(`INSERT INTO cars (model,year,gear,fuel,color,mileage) VALUES (?, ?,?,?,?,?)`,[model, year, gear, fuel, color, mileage], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'New resource created', id: this.lastID });
  });
});

// PUT - Update a resource
server.put('/cars/:id', (req, res) => {
  const { model, year, gear, fuel, color, mileage } = req.body;
  const id = req.params.id;
  db.run(`UPDATE cars SET model = ?, year = ?, gear = ?, fuel = ?, color = ?, mileage = ? WHERE id = ?`, [model, year, gear, fuel, color, mileage, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Resource with ID ${id} updated successfully` });
  });
});

// DELETE - Delete a resource by ID
server.delete('/cars/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM cars WHERE id = ?`, id, function (err) {
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
  db.run(`CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model TEXT,
    year INTEGER,
    gear TEXT,
    fuel TEXT,
    color TEXT,
    mileage INTEGER
  )`);
});

