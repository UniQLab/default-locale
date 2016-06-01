'use strict';

const path = require('path');
const _ = require('underscore');

const localeUtils = require('../utils/localeUtils');
const validationUtils = require('../utils/validationUtils');
const localeConfig = require('../config/locales');

class LocaleCore {

	static init(config) {
		this.config = _.extend(localeConfig, config);
		//validationUtils.validateConfig(this.config);
		this.config.inited = true;
		this.config.context = this.config.CONTEXT || path.join(__dirname, '../../../../');
		this.config.defaultPath = path.join(this.config.context, this.config.RESOURCE_FOLDER);
		this.config.defaultLocalePath = path.join(this.config.defaultPath, this.config.RESOURCE_DEFAULT_FILE);
	}

	static getString(resourceIdentifier, locale) {
		if (!this.config.inited) this.init();
		if (!locale) return localeUtils.obtainFromDefaultLocale(this.config.defaultLocalePath, resourceIdentifier);
		const localePath = localeUtils.obtainResources(locale, this.config);

		return localeUtils.obtainFromRequiredLocale(localePath, resourceIdentifier)
			|| localeUtils.obtainFromDefaultLocale(this.config.defaultLocalePath, resourceIdentifier);
	}
}

module.exports = LocaleCore;
