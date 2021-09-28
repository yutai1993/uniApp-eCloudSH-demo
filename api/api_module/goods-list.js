import { _this } from '@/main';

export const getGoodsList = (params = {}) => _this.$u.get('/goods/search', params);