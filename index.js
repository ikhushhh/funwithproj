require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs")

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
.then(()=> {
    console.log('Connection Successful');
})
.catch((error) => {
    console.log(error);
})

const msgSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    message: {
        required: true,
        type: String
    }
})

const Message = new mongoose.model("Message", msgSchema);

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/message", (req, res) => {
    res.render("message")
})

app.post("/submit", (req, res) => {
   const newMsg = new Message({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       message: req.body.message 
   })

   newMsg.save((err) => {
       if(err){
           console.log(err);
       } else{
           res.render("submit");
       }
   })
})



app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT ${process.env.PORT}`);
})

