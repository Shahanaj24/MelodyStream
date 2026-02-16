const mongoose = require('mongoose');

const connectDB = async()=>
{

try{
    await mongoose.connect(process.env.MONGO_URL)

    console.log("Database connected successfully");

}catch(err)
{
  console.log("Error connecting to database", err);
}
}

module.exports = connectDB;