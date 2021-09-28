<template>
  <view class="content">
    <!-- 假搜索 -->
    <open-search />
    <!-- 轮播 -->
    <view class="SH-swiper">
      <swiper class="swiper" indicator-dots autoplay circular>
        <swiper-item v-for="(item, index) in swiperData" :key="index">
          <navigator
            :url="item.navigator_url"
            open-type="navigate"
            hover-class="navigator-hover"
          >
            <image class="image" :src="item.image_src" mode="widthFix" />
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- 导航 -->
    <view class="nav">
      <navigator
        v-for="(item, index) in navigation"
        :key="index"
        class="link"
        url="/pages/category/index"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <text v-show="false"> {{ item.name }} </text>
        <image class="img" :src="item.image_src" mode="widthFix" />
      </navigator>
    </view>
    <!-- 楼层 -->
    <view class="floor">
      <view class="floor-item" v-for="(item, index) in floor" :key="index">
        <!-- title -->
        <view class="floor-title">
          <image :src="item.floor_title.image_src" mode="widthFix" />
        </view>
        <!-- body -->
        <view class="floor-list">
          <view class="floor-body" v-for="v in item.product_list" :key="v.name">
            <navigator
              class="link"
              :url="v.navigator_url"
              open-type="navigate"
              hover-class="navigator-hover"
            >
              <image class="img" :src="v.image_src" mode="scaleToFill" />
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import openSearch from "../../components/openSearch/openSearch.vue";
export default {
  components: {
    openSearch,
  },

  onLoad() {
    this.init();
  },

  /* 计算属性 */
  computed: {
    ...mapState("home", ["swiperData", "navigation", "floor"]),
  },

  methods: {
    init() {
      this.$store.dispatch("home/fetchSwiperData");
      this.$store.dispatch("home/fetchNavigation");
      this.$store.dispatch("home/fetchFloor");
    },
  },
};
</script>

<style lang="scss">
/* 轮播 */
.SH-swiper .swiper {
  width: 750rpx;
  height: 340rpx;
  .image {
    width: 100%;
  }
}
/* 导航 */
.nav {
  display: flex;
  .link {
    position: relative;
    padding: 20rpx;
    flex: 1;
    .img {
      width: 100%;
    }
  }
}
.floor {
  .floor-item {
    margin-top: 30rpx;
    .floor-list {
      padding: 10rpx;
      padding-top: 0;
      overflow: hidden;
      .floor-body {
        float: left;
        width: 33.33%;
        &:nth-last-child(5) {
          height: 480rpx;
          .link,
          .img {
            height: 480rpx;
          }
        }
        &:nth-last-child(-n + 4) {
          padding-left: 10rpx;
          height: 235rpx;
          .link,
          .img {
            height: 235rpx;
          }
        }
        &:nth-last-child(4) {
         margin-bottom: 10rpx;
        }
        &:nth-last-child(3) {
         margin-bottom: 10rpx;
        }
        .img {
          width: 100%;
        }
      }
    }
  }
}
</style>
