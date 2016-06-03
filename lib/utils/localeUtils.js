'use strict';

const path = require('path');
const _ = require('underscore');
const StringBuilder = require('string-builder');

module.exports = {
	obtainLocale(prefix, localeName, extension) {
		const builder = new StringBuilder(prefix).append(localeName.toLowerCase()).append(extension);
		return builder.toString();
	},

	obtainResources(userLocale, config) {
		const localeName = this.isLocaleSupport(userLocale, config.localeList);
		const locale = localeName ? this.obtainLocale(config.RESOURCE_FILE_PREFIX, localeName, config.RESOURCE_FILE_EXTENSION) : config.RESOURCE_DEFAULT_FILE;
		return path.join(config.defaultPath, locale);
	},

	obtainFromRequiredLocale(localePath, resourceIdentifier) {
		try {
			return require(localePath)[resourceIdentifier];
		} catch (e) {
			return false;
		}
	},

	obtainFromDefaultLocale(defaultLocalePath, resourceIdentifier) {
		const resource = require(defaultLocalePath)[resourceIdentifier];
		if (!resource) throw new Error('Try to obtain missing resource');
		return resource;
	},

	tryFromDefaultLocale(defaultLocalePath, resourceIdentifier) {
		const resource = require(defaultLocalePath)[resourceIdentifier];
		if (!resource) return null;
		return resource;
	},

	isLocaleSupport(localeName, localeList) {
		if (typeof localeName !== typeof '') return false;
		return _.find(localeList, locale => localeName.toLowerCase() === locale.toLowerCase());
	}
};
