const express = require('express');
const db = require('./config/connection.js');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(routes);

// Use this to log mongo queries being executed!
// mongoose.set('debug', true);

db.once('open', () => {

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

});