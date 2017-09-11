# g11n [![Build Status](https://travis-ci.org/cswleocsw/g11n.svg?branch=master)](https://travis-ci.org/cswleocsw/g11n)
The g11n library was designed to allow user integrate difference language file into their application.

## Usage

package.json
```
{
  "package": {
    "name": "g11n",
    "version": "1.0.0",
    "description_1": "This package name is `:name` and version is `:version`",
    "description_2": "This package name is `{%name%}` and version is `{%version%}`"
  }
}
```

js
```javascript
  var g11n = new G11N()

  g11n.imports({ files: ['package.json'] }, function() {
    // g11n.t
    console.log(g11n.t('package.name'))

    // g11n.t with replace
    g11n.t('package.description_1', { replaces: { ':name': 'g11n', ':version': '1.0.0' }))

    // g11n.render with Regular Expression
    g11n.render('This package is {%name%} and version is {%version%}', { path: 'package' })
  })

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
