'use strict';

const path = require('path');
const should = require('chai').should();

const RES_PATH = path.join(__dirname, './locale');
const LocaleService = require('../');
const localeConfig = require('./locale/config/custom')(RES_PATH);

describe('Test of \'default-locale\' library. Static part.', () => {
	it('Testing init method', () => {
		(() => LocaleService.init()).should.Throw('Config is not configured correctly. Please, watch the docs');
		LocaleService.init(localeConfig);
	});

	it('Testing obtain resources from different locales', () => {
		LocaleService.getString('localized').should.equal('Sun (default)');
		LocaleService.getString('localized', 'en').should.equal('Sun (en)');
		LocaleService.getString('localized', 'ru').should.equal('Солнце (ru)');
		LocaleService.getString('localized', 'de').should.equal('Sonne (de)');
		LocaleService.getString('localized', 'fr').should.equal('Soleil (fr)');
		LocaleService.getString('localized', 'it').should.equal('Sole (it)');
		LocaleService.getString('localized', 'es').should.equal('Dom (es)');

		LocaleService.tryString('localized').should.equal('Sun (default)');
		LocaleService.tryString('localized', 'en').should.equal('Sun (en)');
		LocaleService.tryString('localized', 'ru').should.equal('Солнце (ru)');
		LocaleService.tryString('localized', 'de').should.equal('Sonne (de)');
		LocaleService.tryString('localized', 'fr').should.equal('Soleil (fr)');
		LocaleService.tryString('localized', 'it').should.equal('Sole (it)');
		LocaleService.tryString('localized', 'es').should.equal('Dom (es)');
	});

	it('Testing locale sensitivity', () => {
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

		LocaleService.tryString('localized', 'en').should.equal('Sun (en)');
		LocaleService.tryString('localized', 'En').should.equal('Sun (en)');
		LocaleService.tryString('localized', 'eN').should.equal('Sun (en)');
		LocaleService.tryString('localized', 'EN').should.equal('Sun (en)');
		LocaleService.tryString('localized', 'ru').should.equal('Солнце (ru)');
		LocaleService.tryString('localized', 'Ru').should.equal('Солнце (ru)');
		LocaleService.tryString('localized', 'rU').should.equal('Солнце (ru)');
		LocaleService.tryString('localized', 'RU').should.equal('Солнце (ru)');
		LocaleService.tryString('localized', 'de').should.equal('Sonne (de)');
		LocaleService.tryString('localized', 'De').should.equal('Sonne (de)');
		LocaleService.tryString('localized', 'dE').should.equal('Sonne (de)');
		LocaleService.tryString('localized', 'DE').should.equal('Sonne (de)');
	});

	it('Testing missing locales', () => {
		LocaleService.getString('localized', 'yo').should.equal('Sun (default)');
		LocaleService.getString('localized', 'pt').should.equal('Sun (default)');
		LocaleService.getString('localized', 'ro').should.equal('Sun (default)');
		LocaleService.getString('localized', 'bo').should.equal('Sun (default)');
		LocaleService.getString('localized', 'ab').should.equal('Sun (default)');
		LocaleService.getString('localized', 'ar').should.equal('Sun (default)');

		LocaleService.tryString('localized', 'yo').should.equal('Sun (default)');
		LocaleService.tryString('localized', 'pt').should.equal('Sun (default)');
		LocaleService.tryString('localized', 'ro').should.equal('Sun (default)');
		LocaleService.tryString('localized', 'bo').should.equal('Sun (default)');
		LocaleService.tryString('localized', 'ab').should.equal('Sun (default)');
		LocaleService.tryString('localized', 'ar').should.equal('Sun (default)');
	});

	it('Test missing resources', () => {
		(() => LocaleService.getString('missingField')).should.Throw('Try to obtain missing resource');
		(() => LocaleService.getString('missingField', 'en')).should.Throw('Try to obtain missing resource');
		(() => LocaleService.getString('missingField', 'ru')).should.Throw('Try to obtain missing resource');
		(() => LocaleService.getString('missingField', 'de')).should.Throw('Try to obtain missing resource');
		(() => LocaleService.getString('missingField', 'fr')).should.Throw('Try to obtain missing resource');
		(() => LocaleService.getString('missingField', 'jp')).should.Throw('Try to obtain missing resource');
	});

	it('Test missing resources with try', () => {
		should.equal(LocaleService.tryString('missingField'), null);
		should.equal(LocaleService.tryString('missingField', 'en'), null);
		should.equal(LocaleService.tryString('missingField', 'ru'), null);
		should.equal(LocaleService.tryString('missingField', 'de'), null);
		should.equal(LocaleService.tryString('missingField', 'fr'), null);
		should.equal(LocaleService.tryString('missingField', 'jp'), null);
	});
});

