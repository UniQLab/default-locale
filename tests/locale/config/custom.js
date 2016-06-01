module.exports = path => {
	return {
		CONTEXT: path,
		RESOURCE_FOLDER: 'res',
		RESOURCE_DEFAULT_FILE: 'resources.js',
		RESOURCE_FILE_PREFIX: 'resources.',
		RESOURCE_FILE_EXTENSION: '.js',
		localeList: ['en', 'ru', 'de', 'es', 'fr', 'it']
	};
};
