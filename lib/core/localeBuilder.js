'use strict';

const LocaleService = require('../services/localeService');

class LocaleBuilder {
	constructor(config) {
		this.config = LocaleService._obtainConfig(config);
	}

	getString(resourceIdentifier, locale) {
		return LocaleService._getString(this.config, null, resourceIdentifier, locale);
	}
}

module.exports = LocaleBuilder;
