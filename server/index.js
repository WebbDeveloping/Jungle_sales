require('dotenv').config();
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const Ctrl = require('./Ctrl');

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;
app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database Connected');
  app.listen(SERVER_PORT, () => {
    console.log(`Server running at ${SERVER_PORT}`);
  });
});

app.get(`/api/getSeller`, Ctrl.getSeller);
app.get(`/api/getContact/:id`, Ctrl.getContact);
app.get(`/api/shortContact/:id`, Ctrl.shortContact);
app.get(`/api/getLevelByLevel/:id`, Ctrl.levelByLevel)
app.get(`/api/getLevelBySeller/:id`, Ctrl.levelBySeller)
app.post(`/api/createContact/:id`, Ctrl.createContact);
