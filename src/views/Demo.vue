<template>
  <div class="home">
    <mile-stone></mile-stone>
    <active-rules></active-rules>
  </div>
</template>

<script>
// @ is an alias to /src

import MileStone from "@/components/MileStone";
import ActiveRules from "@/components/ActiveRules";
export default {
  name: "Demo",
  components: { MileStone, ActiveRules }
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
    margin-top: 11rem;
  }
  .active-rule {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
}
</style>
