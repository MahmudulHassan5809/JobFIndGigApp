const express = require('express')
const router = express.Router();
const db = require('../config/database')

//Models
const Gig = require('../models/Gig')

//Get Gig List
router.get('/',(req,res) => {
	// res.send('Gigs')
	Gig.findAll()
	   .then(gigs => {
	   	// console.log(gigs);
	   	// res.sendStatus(200);
	   	res.render('gigs',{
			gigs
	   	});
	   })
	   .catch(err => console.log(err))
});

//Display Add ig Form
router.get('/add',(req,res) => {
	res.render('add');
});

//Add a Gig
router.post('/add',(req,res) => {
	// const data = {
	// 	title: 'My Title',
	// 	technologies: 'PHP,Python,JavaScript,NodeKs',
	// 	budget: '$3600',
	// 	description: 'My Description',
	// 	contact_email: 'my@gmail.com'
	// }

	// let { title,technologies,budget,description,contact_email } =  data;

	let { title,technologies,budget,description,contact_email } =  req.body;
	console.log(description);
	let errors = [];

    if (!title) {
		errors.push({text: 'Please Add a title'});
	}
	if (!technologies) {
		errors.push({text: 'Please Add some technologies'});
	}
	if (!description) {
		errors.push({text: 'Please Add a description'});
	}
	if (!contact_email) {
		errors.push({text: 'Please Add a contact_email'});
	}

	//Check For errors
	if (errors.length > 0) {
		res.render('add',{
			errors,
			title,
			technologies,
			budget,
			description,
			contact_email
		});
	}else{
		if(!budget){
			budget = 'Unknown';
		}else{
			budget = `$${budget}`;
		}

		technologies = technologies.toLowerCase().replace(/, /g, ',');
		//Insert Into Tabel
		Gig.create({
			title,
			technologies,
			budget,
			description,
			contact_email
		})
		.then(gig => res.redirect('/gigs'))
		.catch(err => console.log(err));
	}


});

module.exports = router;
