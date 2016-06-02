# default-locale

[![npm version](https://img.shields.io/npm/v/default-locale.svg)](https://npmjs.com/package/default-locale)
[![npm downloads](https://img.shields.io/npm/dm/default-locale.svg)](https://npmjs.com/package/default-locale)
[![dependencies](https://david-dm.org/UniQLab/default-locale.svg)](https://david-dm.org/UniQLab/default-locale)
[![license](https://img.shields.io/npm/l/default-locale.svg)](https://github.com/UniQLab/default-locale/blob/master/LICENSE)

**default-locale** - is a tool that helps you to add multilanguage option :earth_asia: in your web application.

![Default Locale Logo](https://raw.githubusercontent.com/UniQLab/default-locale/master/images/default_locale.png)

## Installation

```
npm install default-locale --save
```

## Examples of usage

Before starting to use this library, you need to prepare a config file and your localized resources.
Make it easier. :muscle:

>The structure of my folders with resources is
> * res.js (default locale)
> * res.en.js (english locale)
> * res.ru.js (russian locale)

**res.js**

```javascript
// Export must be the JSON object!
module.exports = {
	text: 'Hello World!'
};
```

**Config file**

```javascript
'use strict'

module.exports = path => {
	return {
		CONTEXT: path, // current path to the root folder. This folder must contain resources directory.
		RESOURCE_FOLDER: 'resources', // the name of resource folder
		RESOURCE_DEFAULT_FILE: 'res.js', // name of the file, which contain default localized resources
		RESOURCE_FILE_PREFIX: 'res.', // prefix of localized files
		RESOURCE_FILE_EXTENSION: '.js', // extensions of  of localized files
		localeList: ['ru'] // the list of support locales
	};
};
```
**Main program**

```javascript
'use strict';

const localeConfig = require('./localeConfig')(__dirname);
const LocaleService = require('default-locale');

LocaleService.init(localeConfig);
console.log(LocaleService.getString('text'));
console.log(LocaleService.getString('text', 'ru'));
```

## Support

Please, report bugs on the [issue tracker](https://github.com/UniQLab/default-locale/issues)

## License

The MIT License (MIT)

Copyright (c) 2016 Uni-Q Lab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
