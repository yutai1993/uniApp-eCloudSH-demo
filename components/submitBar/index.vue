<template>
	<view class="navigation">
		<view class="left">
			<view class="item">
				<view class="show">
					<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
				</view>
				<button class="Ability" open-type="contact">客服</button>
			</view>
			<view class="item">
				<view class="show">
					<u-icon name="share" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">分享</view>
				</view>
				<button class="Ability" open-type="share">分享</button>
			</view>
			<view class="item car" @click="carHandle">
				<u-badge class="car-num" :count="count" type="error" :offset="[-3, -6]"></u-badge>
				<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">购物车</view>
			</view>
		</view>
		<view class="right">
			<view class="cart btn u-line-1" @click="joinCarHandle">加入购物车</view>
			<view class="buy btn u-line-1" @click="buyHandle">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			count: {
				type: Number,
				default: 0,
			},
		},
		methods: {
			
			/* 进入购物车页面 */
			carHandle() {
				this.$emit("car");
			},
			/* 加入购物车 */
			joinCarHandle() {
				this.$emit("join-car");
			},
			/* 立即购买 */
			buyHandle() {
				this.$emit("buy");
			},
		},
	};
</script>

<style lang="scss" scoped>
	.navigation {
		display: flex;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				position: relative;
				margin: 0 30rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}

				.show {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.Ability {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0%;
					left: 0;
					opacity: 0;
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>
