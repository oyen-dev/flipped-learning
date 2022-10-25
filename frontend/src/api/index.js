import axios from 'axios'

// const staging = 'https://api.flipped.binaceria.dev/api/v1'
const development = 'http://localhost:5000/api/v1'

export default axios.create({
  baseURL: development,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
})
