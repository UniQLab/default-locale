'use strict';

const path = require('path');
const should = require('chai').should();

const RES_PATH = path.join(__dirname, './locale');
const LocaleService = require('../');
const localeConfig = require('./locale/config/custom')(RES_PATH);

describe('Test of \'default-locale\' library', () => {
	it('Testing init method', done => {
		//(() => LocaleService.init()).should.Throw('Config is not configured correctly. Please, watch the docs');
		LocaleService.init(localeConfig);
		done();
	});

	it('Testing obtain resources from different locales', done => {
		LocaleService.getString('localized').should.equal('Sun (default)');
		LocaleService.getString('localized', 'en').should.equal('Sun (en)');
		LocaleService.getString('localized', 'ru').should.equal('Солнце (ru)');
		LocaleService.getString('localized', 'de').should.equal('Sonne (de)');
		LocaleService.getString('localized', 'fr').should.equal('Soleil (fr)');
		LocaleService.getString('localized', 'it').should.equal('Sole (it)');
		LocaleService.getString('localized', 'es').should.equal('Dom (es)');
		done();
	});

	it('Testing locale sensitivity', done => {
		LocaleService.getString('localized', 'en').should.equal('Sun (en)');
		LocaleService.getString('localized', 'En').should.equal('Sun (en)');
		LocaleService.getString('localized', 'eN').should.equal('Sun (en)');
		LocaleService.getString('localized', 'EN').should.equal('Sun (en)');
		LocaleService.getString('localized', 'ru').should.equal('Солнце (ru)');
		LocaleService.getString('localized', 'Ru').should.equal('Солнце (ru)');
		LocaleService.getString('localized', 'rU').should.equal('Солнце (ru)');
		LocaleService.getString('localized', 'RU').should.equal('Солнце (ru)');
		LocaleService.getString('localized', 'de').should.equal('Sonne (de)');
		LocaleService.getString('localized', 'De').should.equal('Sonne (de)');
		LocaleService.getString('localized', 'dE').should.equal('Sonne (de)');
		LocaleService.getString('localized', 'DE').should.equal('Sonne (de)');
		done();
	});

	it('Testing missing locales', done => {
		LocaleService.getString('localized', 'yo').should.equal('Sun (default)');
		LocaleService.getString('localized', 'pt').should.equal('Sun (default)');
		LocaleService.getString('localized', 'ro').should.equal('Sun (default)');
		LocaleService.getString('localized', 'bo').should.equal('Sun (default)');
		LocaleService.getString('localized', 'ab').should.equal('Sun (default)');
		LocaleService.getString('localized', 'ar').should.equal('Sun (default)');
		done();
	});

	it('Test missing resources', done => {
		(() => LocaleService.getString('missingField')).should.Throw('Try to obtain missing resource');
		(() => LocaleService.getString('missingField', 'en')).should.Throw('Try to obtain missing resource');
		(() => LocaleService.getString('missingField', 'ru')).should.Throw('Try to obtain missing resource');
		(() => LocaleService.getString('missingField', 'de')).should.Throw('Try to obtain missing resource');
		(() => LocaleService.getString('missingField', 'fr')).should.Throw('Try to obtain missing resource');
		(() => LocaleService.getString('missingField', 'jp')).should.Throw('Try to obtain missing resource');
		done();
	});
});

