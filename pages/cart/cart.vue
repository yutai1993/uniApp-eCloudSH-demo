<template>
	<view class="cart">
		<view class="notlogin">
			<text class="text">未登录，登陆后同步购物车</text>
			<u-icon name="arrow-right" size="28"></u-icon>
		</view>
		<view class="cart-list">
			<checkbox-group @change="checkboxChange">
				<view class="cart-list-item" v-for="item in goodsDetailList" :key="item.goods_id">
					<label class="cart-item-checkbox">
						<view>
							<checkbox :value="item.goods_id" :checked="item.checked" />
						</view>
					</label>
					<view class="cart-item-right">
						<image class="img" :src="item.pics[0].pics_sma" mode="aspectFit"></image>
						<view class="text">
							<view class="title">
								<text>{{item.goods_name}}</text>
							</view>
							<view class="attribute">
								<text>￥{{item.goods_price}}</text>
								<u-number-box v-model="item.num" :min="1" @change="valChange"></u-number-box>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view class="footer">
			<view class="footer-body">
				<view class="left">
					<checkbox-group @change="checkAllChange">
						<label>
							<checkbox value="0" :checked="checkAll" />全选
						</label>
					</checkbox-group>
				</view>
				<view class="right">
					<view class="text">
						<text>合计:</text>
						<text class="price">￥{{money}}</text>
					</view>
					<view class="account">
						<text>结算</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getStorage, Money
	} from '@/utils/utils'
	export default {
		data() {
			return {
				goodsDetailList: [],
				checkedArr: [] ,// 选中的 商品ID数组
				money: "0.00", // 金额
				checkAll: false, // 全部选中
			};
		},
		onLoad() {

		},
		onShow() {
			this.getDetailList()
		},
		watch:{
			// 监听 选中的ID数组长度变化
			checkedArr(v){
				// 选中的长度 == goodsDetailList长度 全部选中
				v.length == this.goodsDetailList.length ? this.checkAll = true : this.checkAll = false;
				// 重新 计算金额
				this.resetMoney()
			}
		},
		methods: {
			// 获取本地购物车数据
			async getDetailList() {
				let detailList = await getStorage('detailList')
				if (detailList) {
					this.goodsDetailList = detailList
				}
			},
			
			// 重新 计算金额
			resetMoney(){
				// 根据ID数组 找到所有的 数据中的价格 数量
				let list = this.goodsDetailList;
				let checkedArrID = this.checkedArr
				let all = []
				if(checkedArrID.length){
					checkedArrID.forEach(id => {
						let item = list.find(v => v.goods_id == id)
						all.push((item.goods_price * 100 ) * item.num / 100)
					})
					this.money = Money(all.reduce(function (prev, curr) {return prev + curr}))
				}else{
					// 总金额 为 0
					this.money = Money(0)
				}
				
			},
			
			// 全选
			checkAllChange(e){
				let arr = e.detail.value;
				let list = this.goodsDetailList;
				if(arr.length !== 0){
					// 全选
					let idArr = [];
					list.forEach(item => {
						item.checked = true
						idArr.push((item.goods_id).toString())
					})
					this.checkedArr =idArr
				}else{
					list.forEach(item => {
						item.checked = false
					})
					this.checkedArr = []
				}
				// 重新 计算金额
				this.resetMoney()
			},
			
			// 选中状态
			checkboxChange(e) {
				var items = this.goodsDetailList,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes((item.goods_id).toString())) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				this.checkedArr = values;
				
			},
			
			// 步进器
			valChange(e) {
				// 重新 计算金额
				this.resetMoney()
			}
		}
	}
</script>

<style lang="scss">
	.cart {
		.notlogin{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			.text{
				font-size: 28rpx;
				color: #FA3534;
			}
			
		}
		.cart-list {
			.cart-list-item {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				padding: 20rpx;

				.cart-item-right {
					flex: 1;
					display: flex;
					align-items: center;

					.img {
						width: 178rpx;
						height: 178rpx;
						margin-right: 20rpx;
					}

					.text {
						height: 178rpx;
						display: flex;
						flex: 1;
						flex-direction: column;
						justify-content: space-between;

						.title {
							display: -webkit-box;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.attribute {
							display: flex;
							justify-content: space-between;
							align-items: center;

						}
					}
				}
			}
		}

		.footer {
			width: 750rpx;
			height: 100rpx;
			position: fixed;
			bottom: 0;
			padding: 0 20rpx;
			border-top: 1px solid #ccc;

			.footer-body{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.right{
					height: 100rpx;
					display: flex;
					flex-wrap: nowrap;
					align-items: center;
					.price{
						font-size: 28rpx;
						color:#FA3534;
						margin: 0 20rpx 0 0;
					}
					.account{
						border-radius: 30rpx;
						background-color: #FA3534;
						color: #fff;
						font-size: 28rpx;
						font-weight: 700;
						padding: 15rpx 50rpx;
					}
					
				}
			}
		}
	}
</style>
