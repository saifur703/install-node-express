const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0-9ktka.mongodb.net/test?retryWrites=true&w=majority`;

let client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/products', (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Database
  client.connect((error) => {
    const collection = client.db('onlinestore').collection('products');
    collection
      .find()
      .limit(5)
      .toArray((err, documents) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          console.log('successfully Inserted');
          res.send(documents);
          // res.send(result);
        }
        client.close();
      });
  });
});

app.get('/fruits', (req, res) => {
  const fruits = {
    fruit: 'banana',
    quantity: 32,
    price: '20 Taka Per piece.',
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
  'Morium',
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
  // res.send(product);

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //console.log(client);
  // Database
  client.connect((error) => {
    const collection = client.db('onlinestore').collection('products');
    collection.insertOne(product, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        console.log('successfully Inserted');
        res.send(result.ops[0]);
        // res.send(result);
      }
      client.close();
    });
  });
});

app.listen(PORT, () => {
  console.log(`The Server is running under ${PORT}!`);
});
