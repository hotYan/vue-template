import request from '@/utils/request'
// 获取列表
export function list(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
// 详情
export function detail(url, id) {
  return request({
    url: url + '/' + id,
    method: 'get'
  })
}
// 添加
export function add(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
// 编辑

export function edit(url, data) {
  return request({
    url: url,
    method: 'put',
    data
  })
}

// 删除

export function handleDelete(url, ids) {
  return request({
    url: url,
    method: 'delete',
    data: { delete_array: ids }
  })
}
