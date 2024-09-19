const axios = require("axios");

const token = config.fnnas.Cookie;
const agent = config.UserAgent;
function fnnas() { 
  return new Promise(async (resolve) => {
    try {
      const url = 'https://club.fnnas.com/home.php?mod=spacecp&ac=credit';
      const response = await axios.get(url, {
        headers: {
          'User-Agent': agent,
          Cookie: token,
        },
      });
      if (response.status == 200 && response.data.search("登录失败") == -1 && response.data.search("密码错误") == -1) {
        coin = response.data.match("飞牛币: </em>(.*?) &nbsp;")[1]
        point = response.data.match("<em>积分: </em>(.*?)<span")[1]
        msg = `登录成功\n飞牛币：${coin}\n积分：${point}`;
        await sign();
      } else {
        msg = `登录失败`;
      }
    } catch (error) {
      msg =`登录失败，原因：${error.message}`;
    }
    console.log(msg)
    resolve("【飞牛论坛】：" + msg);
  });
}
async function sign() {
  return new Promise(async (resolve) => {
    try {
      const url = 'https://club.fnnas.com/plugin.php?id=zqlj_sign&sign=30879e66';
      const response = await axios.get(url, {
        headers: {
          'User-Agent': agent,
          Cookie: token,
        },
      });
      if (response.status == 200 && response.data.search("登录失败") == -1 && response.data.search("密码错误") == -1&& response.data.search("已经打过卡") == -1) {
          msg = `签到成功`;
      }
      else {
          msg = "签到失败"
      }
    } catch (error) {
      msg =`签到失败，原因：${error.message}`;
    }
    resolve(msg);
  });
}
module.exports = fnnas;
