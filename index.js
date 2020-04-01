const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const data = {
    title: 'Hello World',
    price: 250,
    Name: 'Saifur Rahman'
  };
  res.send(data);
});

app.get('/fruits', (req, res) => {
  const fruits = {
    fruit: 'banana',
    quantity: 32,
    price: '20 Taka Per piece.'
  };
  res.send(fruits);
});

const users = [
  'Saifur',
  'Mamun',
  'Akash',
  'Rahima',
  'Sultana',
  'Tahmina',
  'Morium'
];
app.get('/users/:id', (req, res) => {
  const userID = req.params.id;
  console.log(req.query.sort);
  const name = users[userID];

  res.send({ userID, name });
});

// POST
app.post('/addUser', (req, res) => {
  console.log('Post Req Send.');
  //console.log(req.body);

  // Save to Database
  const user = req.body;
  // user.id = Math.round(Math.random() * 100);
  res.send(user);
});

app.listen(PORT, () => {
  console.log(`The Server is running unser ${PORT}!`);
});
