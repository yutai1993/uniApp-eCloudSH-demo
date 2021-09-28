import { _this } from '@/main.js';

export const getCategory = (params = {}) => _this.$u.get('/categories', params);