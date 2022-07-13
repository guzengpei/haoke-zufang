import request from '@/utils/request'
// 登陆
export const onlogin = ({ username, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}
// 登陆之后获取用户信息
export const getUserMsg = () => {
  return request({
    url: '/user'
  })
}
