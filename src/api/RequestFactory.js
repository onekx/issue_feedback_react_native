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

// 获取某一个产品所有待解决的反馈
export const feedbacks = async (id) => {
    const result = await BaseRequest(`/issue/product/${id}?status=opening`)
    return result
}

// 获取某一个产品所有已关闭的反馈
export const feedbacks_closed = async (id) => {
    const result = await BaseRequest(`/issue/product/${id}?status=closed`)
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

// 用户投票
export const submit_opinion = async (id, data) => {
    const result = await BaseRequest(`/issue/${id}/vote`, data, 'PUT')
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

// 通过 issue_id 查询反馈信息
export const issue_by_id= async (id) => {
    const result = await BaseRequest(`/issue/${id}`)
    return result
}

// 获取未分配该 issue 的开发人员
export const get_developers = async (id) => {
    const result = await BaseRequest(`/issue/${id}/developers`)
    return result
}

// 分配 issue 给开发人员
export const assign_issue = async (id, data) => {
    const result = await BaseRequest(`/issue/${id}/assign`, data, 'PUT')
    return result
}

// 获取该管理人员创建的产品
export const products_by_manager = async (id) => {
    const result = await BaseRequest(`/product/manager/${id}`)
    return result
}

// 删除产品
export const delete_product = async (id, data) => {
    const result = await BaseRequest(`/product/${id}`, data, 'DELETE')
    return result
}

// 修改反馈状态
export const change_status = async (id, data) => {
    const result = await BaseRequest(`/issue/${id}/status`, data, 'PUT')
    return result
}

// 更新产品信息
export const update_product = async (id, data) => {
    const result = await BaseRequest(`/product/${id}`, data, 'PUT')
    return result
}

// 获取用户对该反馈的意见
export const user_opinion = async (issueId, userId) => {
    const result = await BaseRequest(`/issue/${issueId}/user/${userId}/opinion`)
    return result
}

// 获取用户提出的反馈
export const user_feedbacks = async (userId) => {
    const result = await BaseRequest(`/issue/owner/${userId}`)
    return result
}
