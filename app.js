const express = require('express')
const exphb = require('express-handlebars')
const bodyParser = require('body-parser')

//Database
const db = require('./config/database')

//Test DB
db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err) )

const app = express();

//Gig Routes
app.use('/gigs',require('./routes/gigs'));


const PORT = process.env.PORT || 5000

app.get('/',(req,res) => {
	res.send('Hello');
})

app.listen(PORT,console.log(`Server Started on ${PORT}`))
