// index.js

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
const fs = require('fs');
const stringUtils = require('./StringUtils');

const INGREDIENTS_TABLE = process.env.INGREDIENTS_TABLE;

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
};

app.use(bodyParser.json({ strict: false }));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// Get Ingredient endpoint
app.get('/ingredient/:ingredientKey', function (req, res) {
  const params = {
    TableName: INGREDIENTS_TABLE,
    Key: {
      key: req.params.ingredientKey,
    },
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get ingredient' });
    }
    if (result.Item) {
      const {text, tags} = result.Item;
      res.json({ text, tags });
    } else {
      res.status(404).json({ error: "Ingredient not found" });
    }
  });
})

// Add Ingredients endpoint
app.put('/add-ingredients', function (req, res) {
    var content = fs.readFileSync("database.json");
    var obj = JSON.parse(content);
    var keys = Object.keys(obj);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = obj[keys[i]]

        var params = {
            TableName: INGREDIENTS_TABLE,
            Item: {
                key: key,
                text: value['text'],
                tags: value['tags']
            },
        };

		console.log(i);

        dynamoDb.put(params, (error) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error: 'Could not create user' });
            }
        });
    }
})

//Get all Ingredients
app.get('/all', function (req, res) {
  dynamoDb.scan({
    TableName: INGREDIENTS_TABLE
  }, function(error, result) {
    if (error) console.log(error)
    else {
      res.send(result.Items)
    }
  })
})


// Get Fuzzy Search endpoint
app.get('/fuzzy-search/:inputKey', function (req, res) {
    ingredientKey = req.params.inputKey.toHashKey();
    const params = {
      TableName: INGREDIENTS_TABLE,
      Key: {
        key: ingredientKey,
      },
    }

    dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get ingredient' });
      }
      if (result.Item) {
        const {text, tags} = result.Item;
        res.json({ text, tags });
      } else {
        res.status(404).json({ error: "Ingredient not found" });
      }
    });
  })

app.post('/add', function (req, res) {
  console.log(req.body)
  if(req.body.key && req.body.tags){

  var params = {
      TableName: INGREDIENTS_TABLE,
      Item: {
          key: req.body.key,
          text: req.body.key,
          tags: req.body.tags
      },
  };

  dynamoDb.put(params, (error) => {
      if (error) {
          console.log(error);
          res.status(400).json({ error: 'Could not create ingredient' });
      }
      else{
        res.send('Successfully added ingredient ' + req.params.name)
      }
  });
  }
})

module.exports.handler = serverless(app);
