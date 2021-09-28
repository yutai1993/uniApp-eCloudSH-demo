import { _this } from '@/main';

export const getGoodsDetail = (paeams = {}) => _this.$u.get('/goods/detail', paeams);