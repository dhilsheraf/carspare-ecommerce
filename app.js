const express = require('express') ;
const app = express();
const path = require('path');
const connectDB = require("./config/config")
const userRoute = require("./routes/userRoute")
const session = require('express-session')
require('dotenv').config()
const bodyParser = require('body-parser'); 


const  PORT = process.env.PORT || 8080; 

app.use(express.json())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false, 
        httpOnly:true,
        maxAge:72*60*60*1000
    }
}))


app.use(bodyParser.json()); 
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views')); 
app.use(express.urlencoded({ extended: true }));

connectDB()


app.use('/',userRoute) 

  
app.listen(PORT,()=>
console.log(`Server is running on http://localhost:${PORT}`), 
)       