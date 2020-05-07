import axios from 'axios'
export default function request(url, type = 'GET', transmitType = 'url', data = {}) {
  return new Promise(function (resolve, reject) {
    let option = {
      url,
      method: type
    }
    if (transmitType === 'url') {
      option.params = data
    } else {
      option.data = data
    }
    axios(option)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}