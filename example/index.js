let path = require('path')
let express = require('express')
let app = express()

app.use(express.static(path.resolve('.')))
app.use(express.static(path.resolve('../dist')))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
