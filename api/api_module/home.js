// vue 实例this
import { _this } from '@/main';

// 轮播图
export const getSwiperData = (params = {}) => _this.$u.get('/home/swiperdata', params);

// 导航
export const getNavigation = (params = {}) => _this.$u.get('/home/catitems', params);

// 楼层
export const getFloor = (params = {}) => _this.$u.get('/home/floordata', params);
