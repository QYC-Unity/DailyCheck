const axios = require("axios");
function right() { 
  return new Promise(async (resolve) => {
    try {
      const url = 'https://www.right.com.cn/FORUM/home.php?mod=spacecp&ac=credit&showcredit=1';
      const token = config.right.Cookie;
      const agent = config.right.UserAgent;
  
      const response = await axios.get(url, {
        headers: {
          User-Agent: agent,
          Cookie: token,
        },
      });
      console.log(response.data)
      if (response.data.success) {
        msg = `签到成功，获得 ${response.data.data.score} 积分`;
      } else {
        msg = `签到失败，原因：${response.data.message}`;
      }
      console.log(msg)
    } catch (error) {
      msg =`签到失败，原因：${error.message}`;
    }
    resolve("【right】：" + msg);
  });
}
module.exports = right;
