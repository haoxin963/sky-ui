import request from '@/utils/request'

export function loginByUsername(username, password) {
  var grant_type = 'password'
  var client_id = 'sky'
  var client_secret = 'sky'
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    params: { username, password, grant_type, client_id, client_secret }
  })
}

export function getUserInfo() {
  return request({
    url: '/rbac/user/info',
    method: 'get'
  })
}

export function logout(refresh_token) {
  var grant_type = 'refresh_token'
  var client_id = 'sky'
  var client_secret = 'sky'
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    params: { refresh_token, grant_type, client_id, client_secret }
  })
}
