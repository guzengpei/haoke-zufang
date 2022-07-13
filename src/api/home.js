import request from '@/utils/request'

export const getHouseList = (area) => {
  return request({
    url: 'home/groups',
    params: {
      area
    }
  })
}
