<template>
  <div class="lucky-draw">
    <div class="title" style="width: 3rem">集关注度抽奖</div>
    <!-- 中奖记录 -->
    <rewards v-model="visible"></rewards>
    <a class="rewards-btn" @click="visible = true">抽奖记录</a>

    <p class="info">
      当前关注度：<strong>{{ totalFans }}</strong> 剩余抽奖次数：<strong>{{
        remindTime
      }}</strong
      >次
    </p>
    <v-image :src="require('@/assets/prizedraw.png')" width="6.58rem"></v-image>
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
</template>

<script>
import Rewards from "@/components/Rewards";
import { Image, Toast } from "vant";
import { drawPrize, fetchFans, fetchPrizeList, fetchRemindLimit } from "@/api";

export default {
  name: "LuckyDraw",
  components: { VImage: Image, Rewards },
  data() {
    return {
      isLock: false,
      visible: false,
      totalFans: 0,
      remindTime: 0,
      prizes: []
    };
  },
  methods: {
    async fetchPrizes() {
      const data = await fetchPrizeList();
      data.forEach((item, index) => {
        this.prizes.push({
          id: item.id,
          title: item.prize_name,
          background: index % 2 ? "#e6ffff" : "#b0f3d1",
          fonts: [
            {
              text: item.prize_name,
              top: "10%",
              lengthLimit: item.prize_name === "谢谢参与" ? ".8rem" : ""
            }
          ],
          imgs:
            item.prize_name !== "谢谢参与"
              ? [
                  {
                    src: require(`@/assets/${item.prize_name}.png`),
                    // src: `https://thc.lubiao9.cn${item.prize_img}`,
                    width: ".5rem",
                    top: "35%"
                  }
                ]
              : []
        });
      });
    },
    async startCallBack() {
      if (this.isLock) return;
      if (this.remindTime <= 0) {
        Toast.fail({
          message: "剩余抽奖次数为0"
        });
        return;
      }

      this.isLock = true;
      const { prize_id } = await drawPrize();
      this.remindTime -= 1;
      await this.$refs.LuckDraw.play();
      const index = this.prizes.findIndex(item => item.id === prize_id);
      await this.$refs.LuckDraw.stop(index);
      this.isLock = false;
    },
    endCallBack(prize) {
      // Toast.success({});
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
        blocks: [{ padding: ".65rem", background: "transparent" }],
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
  async mounted() {
    this.remindTime = (await fetchRemindLimit()).gamble_times;
    this.totalFans = (await fetchFans()).total;
    await this.fetchPrizes();
  }
};
</script>

<style scoped lang="less">
.lucky-draw {
  text-align: center;
  position: relative;
  box-sizing: border-box;
  padding: 0.5rem 0.3rem;
  background-color: #e6ffff;
  margin: 0 auto;
  border-radius: 0.18rem;
  width: 6.5rem;
  height: 9.3rem;
  box-shadow: 0 0 0.23rem 0.1rem rgba(21, 89, 88, 0.4) inset;
  .info {
    font-size: 0.28rem;
    margin-top: 0.42rem;
    margin-bottom: 0.3rem;
    strong {
      font-size: 0.32rem;
      color: #f09130;
    }
  }

  .rewards-btn {
    position: absolute;
    right: 0.4rem;
    top: 0.4rem;
    font-size: 0.3rem;
    color: #04502e;
    text-decoration: underline;
  }

  .van-image {
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
  }
  .wheel {
    position: absolute;
    left: 50%;
    top: 59.5%;
    transform: translate(-50%, -50%);
  }
}
</style>
