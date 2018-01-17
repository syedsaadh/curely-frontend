if (process.env.NODE_ENV === 'production') {
  module.exports = require('./service.prod')
} else {
  module.exports = require('./service.dev')
}