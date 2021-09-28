<template>
  <view class="goods">
    <open-search></open-search>
    <!-- title -->
    <u-sticky>
      <view class="goods-title-box">
        <view class="goods-title">
          <text
            class="goods-title-item"
            v-for="(item, index) in goodsTitle"
            :key="index"
            @click="goodsTitleHandle(index)"
            >{{ item.title }}</text
          >
        </view>
        <!-- title选中的下划线 -->
        <view class="goods-title-item-active-box">
          <view
            class="goods-title-item-active"
            :style="{
              transform: 'translateX(' + (750 / 3) * TitleIndex + 'rpx)',
            }"
          ></view>
        </view>
      </view>
    </u-sticky>

    <!-- 列表 -->
    <view class="goods-list">
      <navigator
        v-for="(item, index) in goodsList.goods"
        :key="index"
        :url="'/pages/goods-detail/goods-detail?goods_id=' + item.goods_id"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <view class="goods-list-item">
          <view class="goods-list-item-left">
            <image
              class="img"
              :src="item.goods_small_logo | filterSrc"
              mode="widthFix"
            />
          </view>
          <view class="goods-list-item-right">
            <text class="goods-list-item-right-title">
              {{ item.goods_name }}
            </text>
            <text class="goods-list-item-right-text">
              {{ item.goods_price }}
            </text>
          </view>
        </view>
      </navigator>
    </view>
    <view class="u-loadmore">
      <view class="u-loadmore-absolute">
        <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import openSearch from "../../components/openSearch/openSearch.vue";
export default {
  components: { openSearch },
  data() {
    return {
      status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
      goodsTitle: [
        {
          title: "综合",
        },
        {
          title: "销量",
        },
        {
          title: "价格",
        },
      ],
      TitleIndex: 0,
      QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10,
      },
    };
  },
  onLoad(options) {
    this.QueryParams.cid = options.cid;
    this.init(this.QueryParams);
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
    this.QueryParams.pagenum = 1;
    this.$store
      .dispatch("goodsList/fetchGoodsList", this.QueryParams)
      .then(() => {
        uni.stopPullDownRefresh();
      });
  },
  // 触底事件
  onReachBottom() {
    this.QueryParams.pagenum++;
    let totalPageNum = this.goodsList.total / this.QueryParams.pagesize;
    if (this.QueryParams.pagenum > totalPageNum){
      this.status = 'nomore'      
    }else{
      this.status = 'loading'      
      this.$store.dispatch("goodsList/pushGoodsList", this.QueryParams).then(()=>{
        this.status = 'loadmore'
      })
    }
  },
  computed: {
    ...mapState("goodsList", ["goodsList"]),
  },
  methods: {
    init(QueryParams) {
      this.status = 'loading'
      this.$store.dispatch("goodsList/fetchGoodsList", this.QueryParams).then(()=>{
        this.status = 'loadmore'
      })
    },

    goodsTitleHandle(index) {
      this.TitleIndex = index;
      if (index === 1) {
        uni.showToast({
          title: "未实现",
          duration: 2000,
        });
      } else if (index === 2) {
        uni.showToast({
          title: "未实现",
          duration: 2000,
        });
      }
    },
  },
  filters: {
    filterSrc(src){
      if(!src){
        return 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'
      }
      return src
    }
  }
};
</script>

<style lang="scss">
.goods {
  .goods-title-box {
    background-color: #fff;
    .goods-title {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .goods-title-item {
        width: 33.33%;
        padding: 14rpx 0;
        font-size: 28rpx;
        text-align: center;
      }
    }
    .goods-title-item-active-box {
      width: 750rpx;
      .goods-title-item-active {
        width: 33.33%;
        height: 2px;
        background-color: $navigationBarBackgroundColor;
        transition: transform 0.3s;
      }
    }
  }
  .goods-list {
    .goods-list-item {
      display: flex;
      padding: 2px 20rpx 10rpx 0;
      .goods-list-item-left {
        flex: 1;
        text-align: center;
        .img {
          width: 75%;
          height: 210rpx;
        }
      }
      .goods-list-item-right {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .goods-list-item-right-title {
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /*需要显示时文本行数*/
          overflow: hidden;
        }
        .goods-list-item-right-text {
          margin-bottom: 40rpx;
        }
      }
    }
  }
  .u-loadmore{
    height: 30px;
    position: relative;
    .u-loadmore-absolute{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
  }
}
</style>
