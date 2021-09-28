/**
 * 设置本地储存
 * @param {Object} storage_key
 * @param {Object} data
 */
export function setStorage(storage_key, data) {
	return new Promise(function(resolve, reject) {
		uni.setStorage({
			key: storage_key,
			data: data,
			success: function() {
				resolve()
			},
			fail(err) {
				uni.showToast({
					title: '失败',
					icon: 'error'
				})
				reject(err)
			}
		});
	})
}

/**
 * 获取本地储存
 * @param {Object} storage_key
 * @param {Object} data
 */
export function getStorage(storage_key) {
	return new Promise(function(resolve, reject) {
		try {
			const value = uni.getStorageSync(storage_key);
			resolve(value)
		} catch (e) {
			// error
			uni.showToast({
				title: '错误',
				icon: 'error'

			})
			reject(e)
		}
	})
}


/**
 * 获取用户信息
 */
export function getUserProfile(){
	return new Promise((resolve, reject) => {
		uni.getUserProfile({
			desc: '展示用户信息',
			success(res) {
				resolve(res)
			},
			fail(err) {
				uni.showToast({
					title: '错误',
					icon: 'error'
				})
				reject(err)
			}
		})
	})
}

/**
 * JS对金额的处理（保留两位小数位， 每隔三位添加‘，’）
 * @param {Object} money
 */
export function Money(money) {
	return parseFloat(money)
		.toFixed(2)
		.toString()
		.split('')
		.reverse()
		.join('')
		.replace(/(\d{3})/g, '$1,')
		.replace(/\,$/, '')
		.split('')
		.reverse()
		.join('')
}
