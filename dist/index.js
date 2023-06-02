
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dialog-connect-button.cjs.production.min.js')
} else {
  module.exports = require('./dialog-connect-button.cjs.development.js')
}
