import request from '@/utils/request'

export const getAllCity = (level) => {
  return request({
    url: '/area/city',
    params: {
      level
    }
  })
}
