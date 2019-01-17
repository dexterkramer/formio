// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const formSchema = new mongoose.Schema({}, { strict: false, versionKey: false });


// create mongoose model
const Form = mongoose.model('Formulaire', formSchema);


/* GET api listing. */
router.get('/', (req, res) => {
		res.send('api works');
});

router.get('/forms', (req, res) => {
	Form.find({}, (err, forms) => {
		if (err) res.status(500).send(error)

		res.status(200).json(forms);
	});
});

router.get('/forms/:id', (req, res) => {
	Form.findById(req.params.id, (err, forms) => {
		if (err) res.status(500).send(error)

		res.status(200).json(forms);
	});
});

router.delete('/forms/:id', (req, res) => {
	Form.remove({'_id':req.params.id}, (err, forms) => {
		if (err) res.status(500).send(error)

		return res.status(201).json({
			message: 'Form deleted successfully'
		});
	});
});

router.put('/forms/:id', (req, res) => {
	let form = new Form(req.body);
	Form.findOneAndUpdate({'_id':req.params.id},form, {upsert:true}, function(err, doc){
		if (err) return res.send(500, { error: err });
		return res.status(201).json({
			message: 'Form updated successfully',
			data : form
		});
	});
});


router.post('/forms', (req, res) => {
	let form = new Form(req.body);
	form.save(error => {
		if (error) res.status(500).send(error);

		res.status(201).json({
			message: 'Form created successfully',
			data : form
		});
	});
});


module.exports = router;
