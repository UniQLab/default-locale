'use strict';

const path = require('path');
const should = require('chai').should();

const RES_PATH = path.join(__dirname, './locale');
const { LocaleBuilder } = require('../');
const localeConfig = require('./locale/config/custom')(RES_PATH);

describe('Test of \'default-locale\' library. Dynamic part.', () => {
	it('Testing create instance', () => {
		(new LocaleBuilder(localeConfig) instanceof LocaleBuilder).should.equal(true);
	});
});

