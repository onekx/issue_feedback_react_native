import BaseRequest from '../api/BaseRequest'

// 注册账号
export const register = async (data) => {
    const result = await BaseRequest('/account', data, 'POST')
    return result
}

// 登录
export const login = async (data) => {
    const result = await BaseRequest('/login', data, 'POST')
    return result
}

// 创建产品
export const create = async (data) => {
    const result = await BaseRequest('/product', data, 'POST')
    return result
}

// 获取所有产品信息
export const products = async () => {
    const result = await BaseRequest('/products')
    return result
}

// 获取反馈的评论列表
export const comment = async (id) => {
    const result = await BaseRequest(`/comments/${id}`)
    return result
}

// 获取某一个产品的所有反馈
export const feedbacks = async (id) => {
    const result = await BaseRequest(`/issue/product/${id}?status=opening`)
    return result
}

// 用户提交反馈
export const submit = async (data) => {
    const result = await BaseRequest('/issue', data, 'POST')
    return result
}

// 获取用户资料
export const get_profile = async (id) => {
    const result = await BaseRequest(`/profile/${id}`)
    return result
}

// 修改用户资料
export const update_profile = async (id, data) => {
    const result = await BaseRequest(`/profile/${id}`, data, 'PUT')
    return result
}

// 用户提交评论
export const submit_comment = async (data) => {
    const result = await BaseRequest('/comment', data, 'POST')
    return result
}

// 管理人员给反馈打标签
export const set_tag= async (id, data) => {
    const result = await BaseRequest(`/issue/${id}/tag`, data, 'PUT')
    return result
}

// 获取所有标签
export const get_tag= async () => {
    const result = await BaseRequest('/tags')
    return result
}
