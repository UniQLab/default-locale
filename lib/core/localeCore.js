'use strict';

const LocaleBuilder = require('./localeBuilder');
const LocaleService = require('../services/localeService');

class LocaleCore {
	/**
	 * Create a global singleton with resources.
	 * @param {object} config - The base config with current context, list of support locales and other.
	 */
	static init(config) {
		this.config = LocaleService._obtainConfig(config);
	}

	/**
	 * Get value from resources, if resource is missing it fails.
	 * @param {string} resourceIdentifier - An unique filed of resource.
	 * @param {string} locale - Current locale.
	 * @return {string} Always return resource.
	 */
	static getString(resourceIdentifier, locale) {
		return LocaleService._getString(this.config, this.init, resourceIdentifier, locale);
	}

	/**
	 * Get value from resources, if resource is missing it return null.
	 * @param {string} resourceIdentifier - An unique filed of resource.
	 * @param {string} locale - Current locale.
	 * @return {object} Return resource, if found, or null.
	 */
	static tryString(resourceIdentifier, locale) {
		return LocaleService._tryString(this.config, this.init, resourceIdentifier, locale);
	}
}

module.exports = LocaleCore;
module.exports.LocaleBuilder = LocaleBuilder;
