require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err)
    return
  }
  console.log('Connected to MySQL!')
})

app.use(cors())

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'upload/')
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname)
    }
})
const upload = multer({storage : storage})



app.get('/time',(req,res) => {
    const currentTime = new Date()
    res.json({ time:currentTime })
})

app.get('/file',(req,res) => {
      const filePath = path.join(__dirname, 'hello.txt')
res.sendFile(filePath)
})

app.post('/upload', upload.single('file'), (req,res) => {
     if (!req.file) {
    return res.json({ message: 'No file uploaded!' })
  }
  res.json({
    message: 'File uploaded successfully!',
    filename: req.file.originalname,
    size: req.file.size
  })
})

app.use(express.json())

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.json({ error: 'Something went wrong' })
    }
    res.json(results)
  })
})

app.post('/users', (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    return res.json({ error: 'Name and email are required' })
  }

  const query = 'INSERT INTO users (name, email) VALUES (?, ?)'

  db.query(query, [name, email], (err, result) => {
    if (err) {
      return res.json({ error: 'Could not insert user' })
    }
    res.json({
      message: 'User added successfully!',
      id: result.insertId
    })
  })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

