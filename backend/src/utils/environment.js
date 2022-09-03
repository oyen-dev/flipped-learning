const { NODE_ENV = 'development' } = process.env

// Check environments used
// Development environment
const isDev = (NODE_ENV !== 'production' && NODE_ENV !== 'testing' && NODE_ENV !== 'staging')
// Staging environment
const isStaging = (NODE_ENV === 'staging')
// Testing environment
const isTest = NODE_ENV === 'testing'
// Production environment
const isProd = NODE_ENV === 'production'

module.exports = {
  isDev,
  isStaging,
  isTest,
  isProd
}
