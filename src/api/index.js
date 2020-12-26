import axios from "@/utils/request";

export const fetchFans = () => axios.get("/index/fansCount");

export const fetchRemindLimit = () => axios.get("/index/gambleTimes");

export const fetchPrizeList = () => axios.get("/index/prizeList");

export const drawPrize = () => axios.get("/index/gamble");

export const fetchRewardList = () => axios.get("/index/myGambleRecord");

export const wechatLogin = code =>
  axios.get("/index/wechatLogin/code2Token?code=" + code);
