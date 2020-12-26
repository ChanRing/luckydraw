<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { wechatLogin } from "@/api";
//
// function getUrlParam(variable) {
//   const query = window.location.search.substring(1);
//   const vars = query.split("&");
//   for (let i = 0; i < vars.length; i++) {
//     const pair = vars[i].split("=");
//     if (pair[0] === variable) {
//       return pair[1];
//     }
//   }
//   return false;
// }

export default {
  // async created() {
  //   const token = localStorage.getItem("token");
  //   const code = getUrlParam("code");
  //   if (!token) {
  //     if (!code) {
  //       // 没有code就重定向
  //       const REDIRECT_URI = encodeURIComponent(window.location.href);
  //       window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx56c819558fb6cea7&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  //     } else {
  //       // 通过code获取openId
  //       const { token } = await wechatLogin(code);
  //       localStorage.setItem("token", token);
  //       window.location.reload();
  //     }
  //   }
  // }
};
</script>

<style lang="less">
#app {
  position: relative;
  width: 7.5rem;
  margin: 0 auto;
  background-color: #0c585a;
  overflow-y: auto;
  .bg {
    width: 7.5rem;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    margin: auto;
  }
}
</style>
