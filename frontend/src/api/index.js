import axios from 'axios'

// const staging = 'https://staging.flippedlearn.binaceria.dev/api/v1'
const development = 'http://localhost:5000/api/v1'

export default axios.create({
  baseURL: development
})
