var express = require('express'),
	http = require('http'),
	cors = require('cors')
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	app = module.exports = express();

// configure Express
app.set('port', process.env.PORT || 8080);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

// set routes
require('./server/routes.js')(app);

// turn on sever
app.listen(app.get('port'), function () {
	console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});