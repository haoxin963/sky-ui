import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/rbac/menu/page',
    method: 'get',
    params: query
  })
}

export function getObj(id) {
  return request({
    url: '/rbac/menu/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/rbac/menu/',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/rbac/menu/',
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/rbac/menu/' + id,
    method: 'delete'
  })
}
