'use strict';

const path = require('path');
const _ = require('underscore');

const localeConfig = require('../config/locales');
const { localeList } = localeConfig;


class LocaleService {

	static init(config) {
		this.inited = true;
		this.config = _.extend(localeConfig, config);
		this.context = this.config.CONTEXT || path.join(__dirname, '../../../../');
		this.defaultPath = path.join(this.context, this.config.RESOURCE_FOLDER);
		this.defaultLocalePath = path.join(this.defaultPath, this.config.RESOURCE_DEFAULT_FILE);
	}

	static getString(resourceIdentifier, locale) {
		if (!this.inited) this.init();
		if (!locale) return this._obtainFromDefaultLocale(resourceIdentifier);
		const localePath = this._obtainResources(locale);
		return this._obtainFromRequiredLocale(localePath, resourceIdentifier) || this._obtainFromDefaultLocale(resourceIdentifier);
	}

	static _obtainResources(localeName) {
		const locale = this._isLocaleSupport(localeName) ? `${this.config.RESOURCE_FILE_PREFIX}${localeName}${localeConfig.RESOURCE_FILE_EXTENSION}` : this.config.RESOURCE_DEFAULT_FILE;
		return path.join(this.defaultPath, locale);
	}

	static _isLocaleSupport(localeName) {
		if (typeof localeName !== typeof '') return false;
		return _.find(localeList, locale => localeName.toLowerCase() === locale);
	}

	static _obtainFromRequiredLocale(localePath, resourceIdentifier) {
		try {
			return require(localePath)[resourceIdentifier];
		} catch (e) {
			return false;
		}
	}

	static _obtainFromDefaultLocale(resourceIdentifier) {
		const resource = require(this.defaultLocalePath)[resourceIdentifier];
		if (!resource) throw new Error('Try to obtain missing resource');
		return resource;
	}
}

module.exports = LocaleService;
