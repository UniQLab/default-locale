'use strict';

const http = require('http');
const queryString = require('query-string');
const DefaultLocale = require('../../');
const localeConfig = require('./config/custom')(__dirname);

const RS = 'rs'; // resource field
const LN = 'ln'; // language field

	/*
	 *  Query example
	 *  http://localhost:3000/?rs=hellos&ln=en
	 *  http://localhost:3000/?rs=hello&ln=de
	 *  http://localhost:3000/?rs=hello&ln=ru
	 *  http://localhost:3000/?rs=localize&ln=ru
	 */

const server = http.createServer((req, res) => {
	const query = queryString.parse(req.url.substr(1));
	DefaultLocale.init(localeConfig);

	const resource = DefaultLocale.tryString(query[RS], query[LN]);
	if (!resource) return res.end('There is no resource');
	res.end(resource);
});

server.listen(3000);
