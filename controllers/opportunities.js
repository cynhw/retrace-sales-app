var express = require('express');
var Opportunities = require('../models/opportunities');
var router = express.Router();

function getOpps(res) {
	Opportunities.find(function (err, opportunities) {
		if (err) {
			res.send(err);
		}
		res.json(opportunities);
	});
};

router.route('/')
	.get(function(req, res) {
		Opportunities.find(function(err, opps) {
			if(err) return res.status(500).send(err);
			res.send(opps);
		});
	})
	.post(function(req, res) {
		Opportunities.create(req.body, function(err, opp) {
			if (err) return res.status(500).send(err);
			res.send(opp);
		});
	})

module.exports = router;

