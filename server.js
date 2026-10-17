require('dotenv').config()

const { configDotenv } = require('dotenv');
const express = require('express');
const app = express()
const path = require('path')

app.use(express.json())
const port = process.env.PORT


app.use(express.static(path.join(__dirname, "public")));

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"))
})


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date()})`)
  next()
})

app.get('/', (req, res) => {
  res.send('Welcome to week2 node-express class!')
})

app.post('/user', (req, res) => {
  const {name, email} = req.body ?? {}
   if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" ||!email.trim()
  ) {
    return res.status(400).json({
      error: "Enter name and email.",
    });
  }

  res.json({ response: `Hello, ${name.trim()}!` });
 
})


app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  // console.log(id)
  res.json({id: req.params.id, profile: "user"})
  // res.send('My Week 2 API!')
})

app.get('/search', (req, res) => {
  const id = req.query.id;
  console.log(id)
  res.send(id)
  // res.send('My Week 2 API!')
})

app.listen(port, () => {
  console.log(`Week 2 API listening on port ${port}`)
})