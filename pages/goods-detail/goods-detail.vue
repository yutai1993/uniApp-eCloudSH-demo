<template>
	<view class="goods-detail">
		<!-- 轮播 -->
		<view class="swiper-box">
			<swiper class="swiper" indicator-dots autoplay circular>
				<swiper-item class="swiper-item" v-for="item in detailData.pics" :key="item.pics_id">
					<image class="img" :src="item.pics_sma" mode="aspectFit" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 价格 -->
		<view class="goods-price">
			￥ <text>{{ detailData.goods_price && detailData.goods_price }}</text>
		</view>
		<!-- 名字 收藏 -->
		<view class="goods-name-box">
			<view class="goods-name-left">{{
        detailData.goods_name && detailData.goods_name
      }}</view>
			<view class="goods-collect-right" @click="collectHandle">
				<view class="icon">
					<u-icon :name="collectGoodsDetail" color="#2979ff" size="40"></u-icon>
				</view>
				<text class="collect">收藏</text>
			</view>
		</view>
		<!-- 图文详情 -->
		<view class="goods-graphic">
			<view class="goods-graphic-title">
				<text>图文详情</text>
			</view>
			<view class="goods-graphic-parse">
				<u-parse :html="detailData.goods_introduce"></u-parse>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="submit-bar">
			<submit-bar :count="count" @car="carHandle" @join-car="joinCarHandle" @buy="buyHandle"></submit-bar>
		</view>
	</view>
</template>

<script>
	import {
		setStorage,
		getStorage
	} from '@/utils/utils.js';
	import {
		getGoodsDetail
	} from "../../api/api_module/goods-detail";
	import submitBar from "../../components/submitBar";

	export default {
		components: {
			submitBar,
			uParse: () => import(/* webpackChunkName: "u-parse" */'../../uview-ui/components/u-parse/u-parse.vue')
		},
		data() {
			return {
				collectGoodsDetail: "heart",
				detailData: {},
				count: 0,
			};
		},
		onLoad(options) {
			let QueryParams = {
				goods_id: options.goods_id,
			};
			this.fetchGoodsDetail(QueryParams);
			getStorage('detailList').then((res)=>{
				this.count = res.length
			})
		},
		methods: {
			/* 获取数据 */
			async fetchGoodsDetail(params) {
				const result = await getGoodsDetail(params);
				if (result.meta.status === 200) {
					this.detailData = result.message;
					console.log(this.detailData);
					if (this.observation()) {
						this.collectGoodsDetail = "heart-fill";
					}
				}
			},
			/* 收藏事件 */
			collectHandle() {
				let arr = this.getCollectGoodsDetailArr();
				let index = arr.findIndex((v) => v.goods_id === this.detailData.goods_id);
				if (index !== -1) {
					arr.splice(index, 1);
					uni.setStorageSync("collectGoodsDetail", arr);
					this.collectGoodsDetail = "heart";
					uni.showToast({
						title: "取消收藏",
						duration: 2000,
					});
				} else {
					arr.push(this.detailData);
					uni.setStorageSync("collectGoodsDetail", arr);
					this.collectGoodsDetail = "heart-fill";
					uni.showToast({
						title: "收藏成功",
						duration: 2000,
					});
				}
			},
			/* 观测是否收藏 */
			observation() {
				try {
					const collectGoodsDetail = this.getCollectGoodsDetailArr();
					return collectGoodsDetail.some(
						(v) => v.goods_id === this.detailData.goods_id
					);
				} catch (e) {}
			},
			/* 获取收藏的数据数组 */
			getCollectGoodsDetailArr() {
				try {
					return uni.getStorageSync("collectGoodsDetail") || [];
				} catch (e) {}
			},


			/* 进入购物车页面 */
			carHandle() {
				uni.switchTab({
					url: '../cart/cart'
				})
			},
			/* 加入购物车 */
			async joinCarHandle() {
				let detailData = this.detailData;
				let detailList = await getStorage('detailList') || []
				let index = detailList.findIndex(v => v.goods_id === detailData.goods_id)
				if (index === -1) {
					detailData.num = 1,
					detailData.checked = false,
					detailList.push(detailData)
				
				}else {
					detailList[index].num ++;
				}
				setStorage('detailList', detailList).then(() => {
					uni.showToast({
						title:'成功',
						icon: 'success'
					})
				})
				getStorage('detailList').then((res)=>{
					this.count = res.length
				})
			},
			/* 立即购买 */
			buyHandle() {
				uni.showToast({
					title: '未实现',
					icon: 'error'
				})
			},
		},
		filters: {},
	};
</script>

<style lang="scss">
	.goods-detail {
		padding-bottom: 104rpx;

		.swiper-box .swiper {
			width: 750rpx;
			height: 486rpx;

			.swiper-item {
				text-align: center;

				.img {
					width: 100%;
					height: 100%;
				}
			}
		}

		/* 价格 */
		.goods-price {
			margin: 20rpx 30rpx;
			font-weight: 700;
			color: $navigationBarBackgroundColor;
		}

		/* 名字 收藏 */
		.goods-name-box {
			display: flex;
			flex-wrap: nowrap;
			padding-left: 20rpx;

			.goods-name-left,
			.goods-collect-right {
				min-height: 76rpx;
			}

			.goods-name-left {
				flex: 1;
				display: -webkit-box;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				/*需要显示时文本行数*/
				overflow: hidden;
				font-weight: 700;
				font-size: 28rpx;
			}

			.goods-collect-right {
				width: 128rpx;
				border-left: 2px solid #666;
				margin-left: 5rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.icon {
					display: flex;
					justify-content: center;
				}

				.collect {
					font-size: 28rpx;
				}
			}
		}

		/* 图文详情 */
		.goods-graphic {
			padding: 0 20rpx;

			.goods-graphic-title {
				font-weight: 700;
				font-size: 28rpx;
				margin-top: 20rpx;
				margin-bottom: 10rpx;
			}
		}

		/* 底部菜单 */
		.submit-bar {
			width: 100%;
			position: fixed;
			bottom: 0;
		}
	}
</style>
