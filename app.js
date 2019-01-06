const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path');

//Database
const db = require('./config/database')

//Test DB
db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err) )

const app = express();

//HandleBars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Gig Routes
app.use('/gigs',require('./routes/gigs'));


const PORT = process.env.PORT || 5000

//Index Route
app.get('/',(req,res) => {
	// res.send('Hello');
	res.render('index',{
		layout: 'landing'
	});
});

app.listen(PORT,console.log(`Server Started on ${PORT}`))
