# g11n [![Build Status](https://travis-ci.org/cswleocsw/g11n.svg?branch=master)](https://travis-ci.org/cswleocsw/g11n)
The g11n library was designed to allow user integrate difference language file into their application.

# Notice
Not recommended for use in the development of new products

## Todos
* cache loaded content by web storage

# Usage
```javascript
var g11n = new G11N();

var package = {
    name: 'g11n',
    version: '1.0.0',
    descript: 'This package name is `:name` and version is `:version`'
};

// bind json object
g11n.bind(package);
g11n.t('name'); // return g11n

// render
var descript = 'This package name is {%name%} and version is {%version%}';
g11n.render(descript); // return This package name is g11n and version is 1.0.0

// string replace
g11n.t('descript', { ':name': 'g11n', ':version': '1.0.0' }); // return This package name is `g11n` and version is `1.0.0`

// import json file

// if your website has json's resource files
// http://domain/locates/en-us.json
// {
//   "hello": "hello(en-us)"
// }

g11n.imports('locates/en-us');
g11n.t('hello'); // return hello(en-us)

// assign import json content to another namespace
g11n.imports('locates/zh-cn', 'zh-cn');
g11n.t('hello'); // return hello(en-us)
g11n.t('hello', 'zh-cn'); // return hello(zh-cn)


```

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/cswleocsw/g11n/issues).

## License 

The MIT License

Copyright (c) 2015, leo

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
