import 'babel-polyfill'
let testsContext = require.context('.', true, /_test$/)
testsContext.keys().forEach(testsContext)