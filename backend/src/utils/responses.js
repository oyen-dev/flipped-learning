const badResponse = (message, statusCode) => {
  return {
    status: false,
    message,
    error_code: statusCode
  }
}

const successResponse = (message, data) => {
  if (data) {
    return {
      status: true,
      message,
      data
    }
  } else {
    return {
      status: true,
      message
    }
  }
}

module.exports = { badResponse, successResponse }
