import axios from 'axios'

const APP_HOST = `${import.meta.env.VITE_APP_HOST}/api/v1`

export default axios.create({
  baseURL: APP_HOST,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
})
