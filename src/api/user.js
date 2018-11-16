import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/rbac/user/page',
    method: 'get',
    params: query
  })
}

export function getObj(id) {
  return request({
    url: '/rbac/user/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/rbac/user/',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/rbac/user/',
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/rbac/user/' + id,
    method: 'delete'
  })
}
