<template>
  <div class="mile-stone">
    <div class="title">当前关注度</div>
    <div class="steps">
      <div class="step-process" :style="{ width: process }"></div>
      <div
        :class="['step', { active: totalFans >= item }]"
        v-for="(item, i) in stepList"
        :key="i"
      >
        <template v-if="totalFans >= item">
          <icon
            :name="
              i < 5
                ? require('@/assets/coupon_s.png')
                : require('@/assets/gift_s.png')
            "
            size=".6rem"
            @click="handleClick"
          ></icon>
        </template>
        <template v-else>
          <slot class="active-step">
            <icon
              :name="
                i < 5
                  ? require('@/assets/coupon_n.png')
                  : require('@/assets/gift_n.png')
              "
              size=".6rem"
            ></icon>
          </slot>
        </template>
        <p class="step-name">{{ item }}</p>
      </div>
    </div>

    <!-- 中奖记录 -->
    <rewards v-model="visible"></rewards>
    <a @click="visible = true">抽奖记录</a>
  </div>
</template>

<script>
import { Icon } from "vant";
import Rewards from "@/components/Rewards";
import { fetchFans } from "@/api";
export default {
  name: "MileStone",
  components: { Rewards, Icon },
  data() {
    return {
      visible: false,
      totalFans: 0,
      stepList: [5000, 10000, 15000, 20000, 25000, 30000]
    };
  },
  computed: {
    process() {
      let index = 0;
      this.stepList.forEach((item, i) => {
        if (item <= this.totalFans) index = i;
      });
      return `${(index / 6) * 100}%`;
    }
  },
  methods: {
    handleClick() {
      this.$router.push("/home");
    }
  },
  async mounted() {
    if (localStorage.token) this.totalFans = (await fetchFans()).total;
  }
};
</script>

<style scoped lang="less">
@step-icon-size: 0.5rem;

.mile-stone {
  box-sizing: border-box;
  padding: 0.5rem 0.3rem;
  background-color: #e6ffff;
  margin: 0 auto;
  border-radius: 0.18rem;
  width: 6.5rem;
  box-shadow: 0 0 0.23rem 0.1rem rgba(21, 89, 88, 0.4) inset;
}

.steps {
  text-align: center;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &::after {
    position: absolute;
    top: 0.6rem;
    left: 0.4rem;
    right: 0.4rem;
    content: "";
    background-color: #ddd;
    height: 0.1rem;
  }
  .step-process {
    position: absolute;
    top: 0.6rem;
    left: 0.4rem;
    right: 0.4rem;
    background-color: #467960;
    height: 0.1rem;
    z-index: 2;
  }
  .step {
    position: relative;
    flex-grow: 1;
    .van-icon {
      z-index: 99;
      //background: #ddd;
    }
  }
  .step-name {
    font-size: 0.28rem;
  }
}

a {
  color: #04502e;
  font-size: 0.28rem;
  text-align: center;
  display: block;
  margin-top: 0.2rem;
}
</style>
