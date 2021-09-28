<template>
	<view class="open-search">
		<navigator
			class="link"
			url="/pages/search/search"
			open-type="navigate"
			hover-class="navigator-hover"
		>
			搜索
		</navigator>
	</view>
</template>

<script>
	export default {
		name:"openSearch",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.open-search{
		height: 90rpx;
		padding: 10rpx;
		background-color: $navigationBarBackgroundColor;

		.link{
			height: 100%;
			background-color: #fff;
			text-align: center;
			line-height: 70rpx;
			font-size: 28rpx;
			border-radius: $uni-border-radius-lg;
			color: #666;
		}
	}
</style>
