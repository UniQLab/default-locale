'use strict';

const LocaleService = require('../services/localeService');

class LocaleBuilder {
	/**
	 * Create a single instance of locale, called builder (advanced level).
	 * @param {object} config - The base config with current context, list of support locales and other.
	 */
	constructor(config) {
		this.config = LocaleService._obtainConfig(config);
	}

	/**
	 * Create a single instance of locale, called builder (advanced level).
	 * @static
	 * @param {object} config - The base config with current context, list of support locales and other.
	 */
	static getBuilder(config) {
		return new this(config);
	}

	/**
	 * Get value from resources, if resource is missing it fails.
	 * @param {string} resourceIdentifier - An unique filed of resource.
	 * @param {string} locale - Current locale.
	 * @return {string} Always return resource.
	 */
	getString(resourceIdentifier, locale) {
		return LocaleService._getString(this.config, null, resourceIdentifier, locale);
	}

	/**
	 * Get value from resources, if resource is missing it return null.
	 * @param {string} resourceIdentifier - An unique filed of resource.
	 * @param {string} locale - Current locale.
	 * @return {object} Return resource, if found, or null.
	 */
	tryString(resourceIdentifier, locale) {
		return LocaleService._tryString(this.config, null, resourceIdentifier, locale);
	}
}

module.exports = LocaleBuilder;
