require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const Ctrl = require('./Ctrl');
const ac = require('./Auth/AuthControl');
const cc = require('./CreateController');
const app = express();
//USE THIS TO SECURE END POINTS
// app.use(function(req, res, next) {
//   console.log('subdomain', req.subdomains);
//   if (!req.subdomains.includes('http://206.189.218.159:4139')) {
//     return res.sendStatus(403);
//   }
//   return next();
// });
const { SERVER_PORT, CONNECTION_STRING } = process.env;
app.use(bodyParser.json());
massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database Connected');
  app.listen(SERVER_PORT, () => {
    console.log(`Server running at ${SERVER_PORT}`);
  });
});
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
//
// AUTH //
//
app.post(`/auth/register`, ac.register);
app.post(`/auth/login`, ac.login);
app.post(`/auth/logout`, ac.logout);
app.get(`/auth/user`, ac.getUser);
//
// GET //
//
app.get(`/api/getSeller`, Ctrl.getSeller);
app.get(`/api/getContact/:id`, Ctrl.getContact);
app.get(`/api/getContactBySeller/:id`, Ctrl.getContactBySeller);
app.get(`/api/shortContact/:id`, Ctrl.shortContact);
app.get(`/api/getLevelBySellerId/:id`, Ctrl.levelByLevel);
app.get(`/api/getLevelBySeller/:id`, Ctrl.levelBySeller);
app.get('/api/getActionByContact/:id', Ctrl.getActionByContact);
app.get('/api/getActionContact/:contact_id', Ctrl.getActionForContact);
//
// CREATE
//
app.post(`/api/createContact/:id`, cc.createContact);
app.post(`/api/postContactList/:id`, cc.postContactList);
app.post(`/api/createAction`, cc.createAction);
app.post(`/api/createLevel/:id`, cc.createLevel);
app.post(`/api/createStep`, cc.createStep);
