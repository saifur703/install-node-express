const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbUser = 'admin';
const pass = 'Kvw2jIb2ogXAI3WV';
const uri =
  'mongodb+srv://admin:Kvw2jIb2ogXAI3WV@cluster0-9ktka.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });

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
app.post('/addProduct', (req, res) => {
  console.log('Post Req Send.');
  //console.log(req.body);

  // Save to Database
  const product = req.body;
  console.log(product);
  res.send(product);

  // Database
  client.connect(err => {
    const collection = client.db('onlinestore').collection('products');
    collection.insertOne(product, (req, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        console.log('successfully Inserted', result);
        res.send(result.ops[0]);
      }
    });
    client.close();
  });
});

app.listen(PORT, () => {
  console.log(`The Server is running under ${PORT}!`);
});

/*
mongodb + srv://admin:<password>@cluster0-9ktka.mongodb.net/test?retryWrites=true&w=majority
*/
