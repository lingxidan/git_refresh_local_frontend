import http from './http.js'

const URL = {
  GET_DATA: '/node/github/list',
  ADD_DATA: '/node/github/add',
  EDIT_DATA: '/node/github/edit',
  DELETE_DATA: '/node/github/delete',
  CHECK_DATA: '/node/github/check',
}

const SHELL_URL = {
  PUSH: '/node/shell/push',
  PUll: '/node/shell/pull',
  GIT_URL: '/node/shell/getGit',
  GIT_BRANCH: '/node/shell/getBranch'
}

const TOOL_URL = {
  PATH_URL: '/node/tool/path'
}
export default {
  async getData() {
    let resp = await http(URL.GET_DATA, 'GET', 'url', {})
    return resp
  },
  async addData(data) {
    let resp = await http(URL.ADD_DATA, 'POST', 'post', data)
    return resp
  },
  async editData(data) {
    let resp = await http(URL.EDIT_DATA, 'POST', 'post', data)
    return resp
  },
  async deleteData(data) {
    let resp = await http(URL.DELETE_DATA, 'POST', 'post', data)
    return resp
  },
  async checkData({name}) {
    let resp = await http(URL.CHECK_DATA, 'GET', 'url', {name})
    return resp
  },
  // pull/push
  async push(data) {
    let resp = await http(SHELL_URL.PUSH, 'POST', 'post', data)
    return resp
  },
  async pull(data) {
    let resp = await http(SHELL_URL.PUll, 'POST', 'post', data)
    return resp
  },
  async getGit({local}) {
    let resp = await http(SHELL_URL.GIT_URL, 'GET', 'url', {local})
    return resp
  },
  async getBranch({local}) {
    let resp = await http(SHELL_URL.GIT_BRANCH, 'GET', 'url', {local})
    return resp
  },

  // 获取文件路径
  async getPath(data) {
    let resp = await http(TOOL_URL.PATH_URL, 'POST', 'post', data)
    return resp
  },

}