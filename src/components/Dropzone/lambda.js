import axios from 'axios'
import config from '@/config'

export default {
  getSignedURL (fileName, fileType) {
    let endpoint = config.AWS_LAMBDA_GETSIGNEDURL_ENDPOINT
    let payload = {
      filePath: fileName,
      contentType: fileType
    }
    return axios.post(endpoint, payload)
      .then((res) => {
        return Promise.resolve(res.data.url || '/')
      })
      .catch((err) => {
        console.error(err)
        return Promise.reject('/')
      })
  }
}
