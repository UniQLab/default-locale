'use strict';

const Validatron = require('validatron');
const ValidationService = Validatron.createValidator({ env: 'prod' });

module.exports = {
	validateConfig(config) {
		const validator = ValidationService.init(config);

		const result =
			validator
				.add('CONTEXT').should.exist().and.have.type('String')
				.add('RESOURCE_FOLDER').should.exist().and.have.type('String')
				.add('RESOURCE_DEFAULT_FILE').should.exist().and.have.type('String')
				.add('RESOURCE_FILE_PREFIX').should.exist().and.have.type('String')
				.add('RESOURCE_FILE_EXTENSION').should.exist().and.have.type('String')
				.add('localeList').should.exist().and.have.type('Array')
				.validate();

		if (result !== null) throw new Error('Config is not configured correctly. Please, watch the docs');
	}
};
