require('dotenv').config({ override: true });
const { connect } = require('mongoose');
const app = require('./src/app');
const db = require('./src/db/db');

db();

app.listen(3000, ()=>
{
    console.log("Server is running on port 3000");
})