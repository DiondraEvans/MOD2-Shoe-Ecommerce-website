//require all documents first
const express = require ('express');
const mongoose = require('mongoose');
require('dotenv').config()

//have a create route, create data in mongoDB
let shoes = require('./models/shoes');

//create express app
const app = express();
// write down all app.use
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
//remember to input user and pass variables
let connectionString =`mongodb+srv://${process.env.mongoUsername}:${process.env.mongoPassword}@mongosetupcluster.anqqbl8.mongodb.net/EcommerceSite?retryWrites=true&w=majority`

//mongoose requirements
mongoose.set('strictQuery', false);
//connect expresss to Mongo
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});
app.post('/create_shoes', async (req, res) =>{
    //what ever information we get from the body will be saved to individual variables.
    //destructuring remember the variables must match the index.js file to create/read new model variables to send to MongoDB
    const {brand: brand, price: price, description: description, image: img, stock: stock} = req.body;

    //create an object to act as a JSON document to send to the database. we will save it to the returnedValue
    //your going to create an object to send to the database based off of the object you posted to the route. the route will send the object to mongoose aka: fruit.js and verify that it can be sent to the database. so making
    //sure that the await fruit.create variable is the same as the one you required on your server.js is important
    let returnedValue = await shoes.create({
        brand,
        price,
        description,
        img,
        stock
    })

    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    //sending the returned value from the object we created
    res.send(returnedValue);
})
app.get('/get_theShoe_data', async (req, res) => {
    let response = await shoes.find({});
    // console.log(response)
    res.send(response)
   
    // get data from database
    //used an array method to combine both arrays
    // send it back to front end
   
    

})

app.listen(5000,function (){
    console.log('listening on port');
});