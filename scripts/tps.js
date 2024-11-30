const axios = require("axios");

const token = config.tps.Cookie;
const agent = config.UserAgent;
// 请求的 URL
const url = 'https://comm.ams.game.qq.com/ams/ame/amesvr?sServiceType=tps&iActivityId=669689&sServiceDepartment=group_a&sSDID=9d279000b652819bcaf1fb64898a079c';
// POST 请求的数据
const postData = {
    sServiceType: 'tps',
    iActivityId: '669689',
    sServiceDepartment: 'group_a',
    iFlowId: '1071406',
    g_tk: '1842395457',
    sMiloTag: 'AMS-tps-1201001118-MYd6PF-669689-1071406',
    e_code: '544437',
    g_code: '0',
    eas_url: 'https%3A%2F%2Ftps.qq.com%2Fcp%2Fa20240914yyhd%2Findex.html%3Fe_code%3D544437',
    eas_refer: 'https%3A%2F%2Ftps.qq.com%2Fcp%2Fa20240914yyhd%2Findex.html%3Fe_code%3D544437'
};
function tps() { 
  return new Promise(async (resolve) => {
    try {
      const response = await axios.get(url, postData, {
        headers: {
          'User-Agent': agent,
          Cookie: token,
        },
      });
      if (response.status == 200) {
        msg = response.data;
      } else {
        msg = `领取失败`;
      }
    } catch (error) {
      msg =`领取失败，原因：${error.message}`;
    }
    console.log(msg)
    resolve("【tps战令】：" + msg);
  });
}
module.exports = tps;
