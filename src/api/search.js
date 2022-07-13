import request from '@/utils/request'

// 根据区域搜索
export const areaSearch = (id) => {
  return request({
    url: '/houses/condition',
    params: { id }
  })
}

// 搜寻房源
export const houseSearch = ({ cityId, area, subway, rentType, price, more, roomType, oriented, characteristic, floor, start, end }) => {
  return request({
    url: '/houses',
    params: { cityId, area, subway, rentType, price, more, roomType, oriented, characteristic, floor, start, end }
  })
}
