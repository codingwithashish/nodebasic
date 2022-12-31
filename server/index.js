const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8000;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}))
app.use(express.json());
const route = require("./routes/routes");
app.use("/customer", route.routePath);
mongoose.connect('mongodb+srv://ashish:ashish2123@cluster0.gg5dz.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true
}, (err, db) =>{
    if(!err){
        console.log('Database connected Successfully');
    }else{
        console.log(err);
    }
    
}
);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})