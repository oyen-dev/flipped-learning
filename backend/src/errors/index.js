// Create invariant error
const invariantError = (code = 500, message) => {
  return {
    code,
    message
  }
}

module.exports = {
  invariantError
}
