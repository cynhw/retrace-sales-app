var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var morgan = require('morgan');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

var mongoose = require('mongoose');
var Opportunities = require('./models/opportunities');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/retrace-sales');

app.use('/api/opportunities', require('./controllers/opportunities'));
		
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000);