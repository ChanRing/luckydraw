<template>
  <div class="home">
    <sticky offset-top="2.7rem" z-index="999">
      <notice-bar :scrollable="false" background="rgba(0,0,0,.6)" color="#fff">
        <swipe
          ref="swiper"
          vertical
          lazy-render
          class="notice-swipe"
          :autoplay="25 * 1000"
          :touchable="false"
          :show-indicators="false"
        >
          <swipe-item v-for="(item, i) in noticeList" :key="i"
            >恭喜{{ item.nickName }}抽中<strong>{{
              item.giftName
            }}</strong></swipe-item
          >
        </swipe>
      </notice-bar>
    </sticky>

    <lucky-draw></lucky-draw>
    <active-rules></active-rules>
  </div>
</template>

<script>
import ActiveRules from "@/components/ActiveRules";
import LuckyDraw from "@/components/LuckyDraw";
import { NoticeBar, Swipe, SwipeItem, Sticky } from "vant";
export default {
  name: "Home",
  components: { LuckyDraw, ActiveRules, NoticeBar, Swipe, SwipeItem, Sticky },
  data() {
    return {
      noticeList: []
    };
  },
  mounted() {
    for (let i = 0; i <= 100; i++) {
      this.noticeList.push({
        nickName: `用户${+((Math.random() * 20) >> 0)}*****`,
        giftName: [
          "柑胎白茶",
          "茶具4件套",
          "多功能香薰灯",
          "新会陈皮",
          "果泡茶",
          "颈部按摩仪"
        ][(Math.random() * 6) >> 0]
      });
    }
  }
};
</script>

<style scoped lang="less">
.home {
  background-image: url("~@/assets/bg.png");
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 7.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  .mile-stone {
    top: 10rem;
  }
  .lucky-draw {
    margin-top: 11rem;
  }
  .active-rule {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  .van-notice-bar {
    //top: 2.8rem;
    //left: 0;
    //right: 0;
    //position: fixed;
    margin: 0 auto;
    width: 4.63rem;
    height: 0.59rem;
    border-radius: calc(0.59rem / 2);
  }
  .notice-swipe {
    height: 0.59rem;
    line-height: 0.59rem;
    text-align: center;
    width: 4.62rem;
  }
  strong {
    color: #ffe083;
  }
}
</style>
