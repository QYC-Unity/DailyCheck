const axios = require("axios");
function checkin() { 
  return new Promise(async (resolve) => {
    try {
      const url = 'www.right.com.cn';
  const token = config.right.Cookie; // 
  
    const response = await axios.get(url, {
      headers: {
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
