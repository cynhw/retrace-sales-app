var mongoose = require('mongoose');

var OpportunitiesSchema = new mongoose.Schema({
	manufacturer: String,
	model: String,
	storage: String,
	condition: String,
	carrier: String,
	color: String,
	country: String,
	quantity: Number,
	price: Number,
	salesRep: String,
	type: String,
	created_at: Date,
	updated_at: Date
});

OpportunitiesSchema.pre('save', function(next){
	now = new Date();
	this.updated_at = now;
	if (!this.created_at) {
		this.created_at = now;
	}
	next();
});

module.exports = mongoose.model('Opportunities', OpportunitiesSchema);
