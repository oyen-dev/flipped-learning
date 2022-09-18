import axios from 'axios'

export default axios.create({
  baseURL: 'https://staging.flippedlearn.binaceria.dev/api/v1'
})
