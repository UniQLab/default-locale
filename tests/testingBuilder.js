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

	it('Testing init method', () => {
		(() => new LocaleBuilder()).should.Throw('Config is not configured correctly. Please, watch the docs');
		this.builder = new LocaleBuilder(localeConfig);
	});

	it('Testing obtain resources from different locales', () => {
		this.builder.getString('localized').should.equal('Sun (default)');
		this.builder.getString('localized', 'en').should.equal('Sun (en)');
		this.builder.getString('localized', 'ru').should.equal('Солнце (ru)');
		this.builder.getString('localized', 'de').should.equal('Sonne (de)');
		this.builder.getString('localized', 'fr').should.equal('Soleil (fr)');
		this.builder.getString('localized', 'it').should.equal('Sole (it)');
		this.builder.getString('localized', 'es').should.equal('Dom (es)');

		this.builder.tryString('localized').should.equal('Sun (default)');
		this.builder.tryString('localized', 'en').should.equal('Sun (en)');
		this.builder.tryString('localized', 'ru').should.equal('Солнце (ru)');
		this.builder.tryString('localized', 'de').should.equal('Sonne (de)');
		this.builder.tryString('localized', 'fr').should.equal('Soleil (fr)');
		this.builder.tryString('localized', 'it').should.equal('Sole (it)');
		this.builder.tryString('localized', 'es').should.equal('Dom (es)');
	});

	it('Testing locale sensitivity', () => {
		this.builder.getString('localized', 'en').should.equal('Sun (en)');
		this.builder.getString('localized', 'En').should.equal('Sun (en)');
		this.builder.getString('localized', 'eN').should.equal('Sun (en)');
		this.builder.getString('localized', 'EN').should.equal('Sun (en)');
		this.builder.getString('localized', 'ru').should.equal('Солнце (ru)');
		this.builder.getString('localized', 'Ru').should.equal('Солнце (ru)');
		this.builder.getString('localized', 'rU').should.equal('Солнце (ru)');
		this.builder.getString('localized', 'RU').should.equal('Солнце (ru)');
		this.builder.getString('localized', 'de').should.equal('Sonne (de)');
		this.builder.getString('localized', 'De').should.equal('Sonne (de)');
		this.builder.getString('localized', 'dE').should.equal('Sonne (de)');
		this.builder.getString('localized', 'DE').should.equal('Sonne (de)');

		this.builder.tryString('localized', 'en').should.equal('Sun (en)');
		this.builder.tryString('localized', 'En').should.equal('Sun (en)');
		this.builder.tryString('localized', 'eN').should.equal('Sun (en)');
		this.builder.tryString('localized', 'EN').should.equal('Sun (en)');
		this.builder.tryString('localized', 'ru').should.equal('Солнце (ru)');
		this.builder.tryString('localized', 'Ru').should.equal('Солнце (ru)');
		this.builder.tryString('localized', 'rU').should.equal('Солнце (ru)');
		this.builder.tryString('localized', 'RU').should.equal('Солнце (ru)');
		this.builder.tryString('localized', 'de').should.equal('Sonne (de)');
		this.builder.tryString('localized', 'De').should.equal('Sonne (de)');
		this.builder.tryString('localized', 'dE').should.equal('Sonne (de)');
		this.builder.tryString('localized', 'DE').should.equal('Sonne (de)');
	});

	it('Testing missing locales', () => {
		this.builder.getString('localized', 'yo').should.equal('Sun (default)');
		this.builder.getString('localized', 'pt').should.equal('Sun (default)');
		this.builder.getString('localized', 'ro').should.equal('Sun (default)');
		this.builder.getString('localized', 'bo').should.equal('Sun (default)');
		this.builder.getString('localized', 'ab').should.equal('Sun (default)');
		this.builder.getString('localized', 'ar').should.equal('Sun (default)');

		this.builder.tryString('localized', 'yo').should.equal('Sun (default)');
		this.builder.tryString('localized', 'pt').should.equal('Sun (default)');
		this.builder.tryString('localized', 'ro').should.equal('Sun (default)');
		this.builder.tryString('localized', 'bo').should.equal('Sun (default)');
		this.builder.tryString('localized', 'ab').should.equal('Sun (default)');
		this.builder.tryString('localized', 'ar').should.equal('Sun (default)');
	});

	it('Test missing resources', () => {
		(() => this.builder.getString('missingField')).should.Throw('Try to obtain missing resource');
		(() => this.builder.getString('missingField', 'en')).should.Throw('Try to obtain missing resource');
		(() => this.builder.getString('missingField', 'ru')).should.Throw('Try to obtain missing resource');
		(() => this.builder.getString('missingField', 'de')).should.Throw('Try to obtain missing resource');
		(() => this.builder.getString('missingField', 'fr')).should.Throw('Try to obtain missing resource');
		(() => this.builder.getString('missingField', 'jp')).should.Throw('Try to obtain missing resource');
	});

	it('Test missing resources with try', () => {
		should.equal(this.builder.tryString('missingField'), null);
		should.equal(this.builder.tryString('missingField', 'en'), null);
		should.equal(this.builder.tryString('missingField', 'ru'), null);
		should.equal(this.builder.tryString('missingField', 'de'), null);
		should.equal(this.builder.tryString('missingField', 'fr'), null);
		should.equal(this.builder.tryString('missingField', 'jp'), null);
	});
});

