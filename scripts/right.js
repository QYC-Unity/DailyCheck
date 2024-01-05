const axios = require("axios");
function right() { 
  return new Promise(async (resolve) => {
    try {
      const url = 'https://www.right.com.cn/FORUM/home.php?mod=spacecp&ac=credit&showcredit=1';
      const token = config.right.Cookie;
      const agent = config.UserAgent;
  
      const response = await axios.get(url, {
        headers: {
          'User-Agent': agent,
          Cookie: token,
        },
      });
      if (response.status == 200 && response.data.search("登录失败") == -1 && response.data.search("密码错误") == -1) {
        coin = response.data.match("恩山币: </em>(.*?) &nbsp;")[1]
        point = response.data.match("<em>积分: </em>(.*?)<span")[1]
        msg = `签到成功\n恩山币：${coin}\n积分：${point}`;
      } else {
        msg = `签到失败`;
      }
    } catch (error) {
      msg =`签到失败，原因：${error.message}`;
    }
    console.log(msg)
    resolve("【恩山论坛】：" + msg);
  });
}
module.exports = right;
