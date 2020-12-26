<template>
  <div class="draw">
    <notice-bar :scrollable="false" background="rgba(0,0,0,.6)" color="#fff">
      <swipe
        ref="swiper"
        vertical
        lazy-render
        class="notice-swipe"
        :autoplay="3000"
        :touchable="false"
        :show-indicators="false"
        @change="handleChange"
      >
        <swipe-item v-for="(item, i) in noticeList" :key="i"
          >恭喜“{{ item.nickname }}”抽中<strong>{{
            item.giftName
          }}</strong></swipe-item
        >
      </swipe>
    </notice-bar>

    <div class="lucky-draw">
      <v-image
        :src="require('@/assets/prizedraw.png')"
        width="6.58rem"
      ></v-image>
      <LuckyWheel
        class="wheel"
        width="6.58rem"
        height="6.58rem"
        v-bind="wheelConfig"
        ref="LuckDraw"
        @start="startCallBack"
        @end="endCallBack"
      />
    </div>
  </div>
</template>

<script>
let data = [
  "1元红包",
  "100元红包",
  "0.5元红包",
  "2元红包",
  "10元红包",
  "50元红包",
  "0.3元红包",
  "5元红包"
];
import { NoticeBar, Swipe, SwipeItem, Image } from "vant";
export default {
  name: "Draw",
  components: { NoticeBar, Swipe, SwipeItem, VImage: Image },
  data() {
    return {
      prizes: [],
      noticeList: []
    };
  },
  methods: {
    handleChange() {},
    fetchNotices() {
      this.noticeList = [
        { nickname: "赖昌荣", giftName: data[(Math.random() * 8) >> 0] },
        { nickname: "nickname", giftName: data[(Math.random() * 8) >> 0] },
        { nickname: "1882", giftName: data[(Math.random() * 8) >> 0] },
        { nickname: "2101", giftName: data[(Math.random() * 8) >> 0] },
        { nickname: "kk", giftName: data[(Math.random() * 8) >> 0] }
      ];
    },
    fetchPrizes() {
      data.forEach((item, index) => {
        this.prizes.push({
          title: item,
          background: index % 2 ? "#e6ffff" : "#b0f3d1",
          fonts: [{ text: item, top: "10%" }]
          // imgs: [
          //   {
          //     src: '',
          //     // src: "https://100px.net/assets/img/0.efbe4dff.png",
          //     width: "30%",
          //     top: "35%"
          //   }
          // ]
        });
      });
    },
    async startCallBack() {
      this.$refs.LuckDraw.play();
      const index = await setTimeout(
        () => Promise.resolve((Math.random() * 8) >> 0),
        2000
      );
      await this.$refs.LuckDraw.stop(index);
    },
    endCallBack(prize) {
      console.log(prize);
      this.$emit("stop", prize);
    }
  },
  computed: {
    wheelConfig() {
      return {
        prizes: this.prizes,
        defaultStyle: {
          fontColor: "#0c585a",
          fontSize: ".28rem"
        },
        blocks: [{ padding: ".66rem", background: "transparent" }],
        buttons: [
          {
            radius: "1rem",
            background: "transparent",
            imgs: [
              {
                src: require("@/assets/button.png"),
                width: "100%",
                top: "-1.5rem"
              }
            ]
          }
        ]
      };
    }
  },
  created() {
    this.fetchPrizes();
    this.fetchNotices();
  }
};
</script>

<style scoped lang="less">
.draw {
  width: 7.5rem;
  margin: 0 auto;
  overflow: hidden;
  .van-notice-bar {
    font-size: 0.3rem;
    margin: 3rem auto 1rem;
    max-width: 4.63rem;
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

  .lucky-draw {
    //margin: 0 auto;
    text-align: center;
    position: relative;
    .van-image {
      position: absolute;
      left: 50%;
      top: 51%;
      transform: translate(-50%, -50%);
    }
    .wheel {
      margin: 0 auto;
    }
  }
}
</style>
