'use strict';

const LocaleBuilder = require('./localeBuilder');
const LocaleService = require('../services/localeService');

class LocaleCore {

	static init(config) {
		this.config = LocaleService._obtainConfig(config);
	}

	static getString(resourceIdentifier, locale) {
		return LocaleService._getString(this.config, this.init, resourceIdentifier, locale);
	}
}

module.exports = LocaleCore;
module.exports.LocaleBuilder = LocaleBuilder;
