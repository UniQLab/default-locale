'use strict';

const path = require('path');
const should = require('chai').should();

const RES_PATH = path.join(__dirname, './locale');
const LocaleService = require('../lib/services/localeService');
const localeConfig = require('./locale/config/custom')(RES_PATH);

describe('Test of options', function() {

	it('Should return \'Lorem\'', function (done) {
		LocaleService.init(localeConfig);
		LocaleService.getString('lorem').should.equal('Lorem');
		done();
	});
});

