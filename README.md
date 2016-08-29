# g11n [![Build Status](https://travis-ci.org/cswleocsw/g11n.svg?branch=master)](https://travis-ci.org/cswleocsw/g11n)
The g11n library was designed to allow user integrate difference language file into their application.

## CHANGELOG
2016-08-29
update version 2.1.0

2016-08-04
update version 2.0.1

## Usage

package.json
```
{
  package: {
     name: 'g11n',
     version: '1.0.0',
     descript: 'This package name is `:name` and version is `:version`'
  }
}
```

```javascript
var g11n = new G11N()

g11n.imports('package.json')

g11n
// bind json object
g11n.t('package.name')

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
