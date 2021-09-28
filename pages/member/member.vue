<template>
	<view class="member">
		<!-- header -->
		<view class="header" v-if="notlogin">
			<view class="content">
				<view class="img-box" @click="getUserProfile">
					<image class="Ability" src="../../static/Avatar.png" mode="aspectFit"></image>
				</view>
				<text class="text" @click="getUserProfile">未登录</text>
			</view>
		</view>
		<view class="header" v-else>
			<view class="content">
				<view class="img-box">
					<image class="Ability" :src="user.imgUrl" mode="aspectFit"></image>
				</view>
				<text class="text">{{user.name}}</text>
			</view>
		</view>
		<view class="body">
			<view class="nav">
				<view class="item" v-for="(item, index) in nav" :key="item.title">
					<text class="number">{{item.number}}</text>
					<text class="text">{{item.title}}</text>
				</view>
			</view>
			<view class="main">
				<!-- 订单 -->
				<view class="order">
					<view class="order-title">
						<text class="order-text">我的订单</text>
					</view>
					<view class="order-container">
						<view class="order-item" v-for="(item, index) in order" :key="item.text">
							<u-icon name="file-text" color="#FA3534" size="60"></u-icon>
							<text class="text">{{item.text}}</text>
						</view>
					</view>
				</view>
				<!--  -->
				<view class="address">
					<text>收获地址管理</text>
				</view>

				<view class="service">
					<text>联系客服</text>
					<text>400-618-4000</text>
				</view>
				<view class="feedback">
					<text>意见反馈</text>
				</view>
				<view class="about">
					<text>关于我们</text>
				</view>
				<!-- 推荐 -->
				<view class="recommended">
					<text>把应用推荐给其他人</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getStorage,
		setStorage,
		getUserProfile
	} from '../../utils/utils.js'
	export default {
		data() {
			return {
				notlogin: true,
				storage_key: 'user',
				user: {
					name: '',
					imgUrl: ''
				},
				nav: [{
					number: 1,
					title: '收藏的店铺'
				}, {
					number: 3,
					title: '收藏的商品'
				}, {
					number: 8,
					title: '庄主的商品'
				}, {
					number: 5,
					title: '我的足迹'
				}, ],
				order: [{
					text: '全部订单'
				}, {
					text: '待付款'
				}, {
					text: '待收货'
				}, {
					text: '退款/退货'
				}, ]
			};
		},
		onLoad(options) {
			this.getUserStorage()
		},
		methods: {
			// 获取用户信息 须授权
			async getUserProfile() {
				// 先从缓存中获取
				let user = await getStorage(this.storage_key)
				if (!user) {
					let user = await getUserProfile()
					let us = {}
					us.imgUrl = user.userInfo.avatarUrl
					us.name = user.userInfo.nickName
					this.user = us
					await setStorage(this.storage_key, us)
					this.notlogin = false
				}

			},
			// 从本地获取 用户信息
			async getUserStorage() {
				let user = await getStorage(this.storage_key)
				if (user) {
					this.user = user
					this.notlogin = false
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #E4E7ED;
	}

	.member {
		.header {
			height: 20vh;
			padding: 20rpx;
			background-color: $navigationBarBackgroundColor;
			display: flex;
			justify-content: center;
			flex-direction: column;

			.content {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				transform: translateY(-20rpx);

				.img-box {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20rpx;

					.Ability {
						width: 100%;
						height: 100%;
					}

				}

				.text {
					font-size: 38rpx;
					color: #fff;
				}
			}

		}

		.body {
			.nav {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				padding: 0 20rpx;
				transform: translateY(-30rpx);

				.item {
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					background-color: #fff;
					padding: 10rpx;

					.number {
						color: #FA3534;
					}

					.number,
					.text {
						font-size: 28rpx;
					}

				}
			}

			.main {
				padding: 0 20rpx;

				.order {

					display: flex;
					flex-direction: column;

					.order-title {
						padding: 20rpx;
						border-bottom: 1px solid #ccc;
					}

					.order-title,
					.order-container {

						background-color: #fff;

						.order-text {
							font-size: 28rpx;
						}
					}

					.order-container {
						display: flex;
						flex-wrap: nowrap;
						flex: 1;

						.order-item {
							display: flex;
							justify-content: space-between;
							flex-direction: column;
							align-items: center;
							flex: 1;
							padding: 15rpx 0;

							.text {
								font-size: 28rpx;
							}
						}
					}
				}

				.address {
					display: flex;
					align-items: center;
					padding: 20rpx;
					background-color: #fff;
					margin: 20rpx 0;
					font-size: 28rpx;
				}

				.service {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.service,
				.feedback,
				.about,
				.recommended {
					font-size: 28rpx;
					background-color: #fff;
					padding: 20rpx;
				}

				.recommended {
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
