const axios = require("axios");

const token = config.tps.Cookie;
const agent = config.UserAgent;
// 动态的参数数组
const iFlowIdArray = config.tps.iFlowId;
const taskRicevereArray = config.tps.taskRicevere;
// 请求的 URL
const url = 'https://comm.ams.game.qq.com/ams/ame/amesvr?sServiceType=tps&iActivityId=669689&sServiceDepartment=group_a&sSDID=9d279000b652819bcaf1fb64898a079c';

function tps() { 
  return new Promise(async (resolve) => {
    try {
      msg = '开始领取战令奖励'
      for (let i = 0; i < iFlowIdArray.length; i++){
        const iFlowId = iFlowIdArray[i];
        const taskRicevere = taskRicevereArray[i];
        // POST 请求的数据
        const postData = `sServiceType=tps&iActivityId=669689&sServiceDepartment=group_a&iFlowId=${iFlowId}&g_tk=1842395457&sMiloTag=AMS-tps-1201012751-BiS0fp-669689-1071393&e_code=544437&g_code=0&eas_url=https%253A%252F%252Ftps.qq.com%252Fcp%252Fa20240914yyhd%252Findex.html%253Fe_code%253D544437&eas_refer=https%253A%252F%252Ftps.qq.com%252Fcp%252Fa20240914yyhd%252Findex.html%253Fe_code%253D544437&taskRicevere=${taskRicevere}`;
        const response = await axios.post(url, postData, {
          headers: {
            'User-Agent': agent,
            Cookie: token,
            'referer': 'https://tps.qq.com/'
          },
        });
        if (response.status == 200) {
          msg += `领取成功，taskRicevere：${taskRicevere}`;
        } else {
          msg += `领取失败，taskRicevere：${taskRicevere}`;
        }
      }
    } catch (error) {
      msg =`领取失败，原因：${error.message}`;
    }
    console.log(msg)
    resolve("【tps战令】：" + msg);
  });
}
module.exports = tps;
