<template>
  <popup
    class="rewards"
    :value="value"
    v-on="$listeners"
    @open="handleOpen"
    round
    closeable
  >
    <h3>抽奖记录</h3>
    <p class="empty-msg" v-if="!rewards.length">暂无抽奖记录</p>
    <cell
      v-for="({ prize_name, create_time, receive_code }, i) in rewards"
      center
      :title="prize_name"
      :label="create_time"
      :key="i"
    >
      <tag type="primary">{{ receive_code }}</tag>
    </cell>
  </popup>
</template>

<script>
import { Popup, Cell, Tag } from "vant";
import { fetchRewardList } from "@/api";

export default {
  name: "Rewards",
  components: { Popup, Cell, Tag },
  props: {
    value: Boolean
  },
  data() {
    return {
      rewards: []
    };
  },
  methods: {
    async handleOpen() {
      // init rewards list
      const { data = [] } = await fetchRewardList();
      this.rewards = data;
      // this.rewards = data.filter(item => item.prize_name !== "谢谢参与");
    }
  }
};
</script>

<style scoped lang="less">
.rewards {
  width: 6rem;
  height: 9.6rem;
  max-height: 80vh;
  h3 {
    font-size: 0.36rem;
    margin: 0.34rem auto;
    text-align: center;
  }
  /deep/ .van-cell {
    color: #04502e;
    &__title {
      text-align: left;
    }
  }
  .empty-msg {
    font-size: 0.32rem;
    color: #969799;
  }
}
</style>
