'use strict';

const path = require('path');
const _ = require('underscore');

const localeUtils = require('../utils/localeUtils');
const validationUtils = require('../utils/validationUtils');
const defaultConfig = require('../config/locales');

class LocaleService {
	static _obtainConfig(userConfig) {
		const config = _.extend(defaultConfig, userConfig);
		//validationUtils.validateConfig(config);
		config.inited = true;
		config.context = config.CONTEXT || path.join(__dirname, '../../../../');
		config.defaultPath = path.join(config.context, config.RESOURCE_FOLDER);
		config.defaultLocalePath = path.join(config.defaultPath, config.RESOURCE_DEFAULT_FILE);
		return config;
	}

	static _getString(config, init, resourceIdentifier, locale) {
		if (!config.inited && init) init();
		if (!locale) return localeUtils.obtainFromDefaultLocale(config.defaultLocalePath, resourceIdentifier);
		const localePath = localeUtils.obtainResources(locale, config);

		return localeUtils.obtainFromRequiredLocale(localePath, resourceIdentifier)
			|| localeUtils.obtainFromDefaultLocale(config.defaultLocalePath, resourceIdentifier);
	}
}

module.exports = LocaleService;
