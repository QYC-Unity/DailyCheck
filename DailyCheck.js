const yaml = require("js-yaml");
const fs = require('fs');
let QL = process.env.QL_DIR
config = null, notify = null, signlist = [], logs = "", needPush = false
if (fs.existsSync("./sendNotify.js")) notify = require('./sendNotify')

//自行添加任务 名字看脚本里的文件名 比如linkai.js 就填"linkai"
var cbList = []
async function go() {
    if (fs.existsSync("./DailyCheck_config.yml")) config = yaml.load(fs.readFileSync('./DailyCheck_config.yml', 'utf8'));
    if (QL) {
        console.log("当前是青龙面板,路径：" + QL)
        if (fs.existsSync(`/${QL}/data/config/DailyCheck_config.sh`)) console.log("建议更新到最新版青龙再来运行哦,或者手动修改路径叭~")
        cbList = process.env.cbList ? process.env.cbList.split("&") : []
        if (!fs.existsSync(`/${QL}/data/config/DailyCheck_config.yml`)) {
            console.log("您还没有填写cookies配置文件,请配置好再来运行8...\n配置文件路径/ql/data/config/DailyCheck_config.yml\n如没有文件复制一份DailyCheck_config.yml.temple并改名为DailyCheck_config.yml")
            return;
        } else {
            if (yaml.load) config = yaml.load(fs.readFileSync(`/${QL}/data/config/DailyCheck_config.yml`, 'utf8'))
            else console.log("亲,您的依赖掉啦,但是没有完全掉 请重装依赖\npnpm install  axios crypto-js fs js-yaml\n或者\nnpm install  axios crypto-js fs js-yaml")
        }
    }
    if (config) signlist = config.cbList.split("&")
    if (config && config.needPush) needPush = true   
    var signList = cbList.length > 0 ? cbList : signlist
}

function start(taskList) {
    return new Promise(async (resolve) => {
        try {
            console.log("任务个数  " + taskList.length)
            console.log("------------开始签到任务------------");
            for (let i = 0; i < taskList.length; i++) {
                console.log(`任务${i + 1}执行中`);
                let exists = fs.existsSync(`./scripts/${taskList[i]}.js`)
                if (exists) {
                    const task = require(`./scripts/${taskList[i]}.js`);
                    taskResult = await task()
                    if (taskResult && taskResult.match(/单独通知|cookie|失效|失败|出错|重新登录/)) await sendmsg(taskResult)
                    else logs += taskResult + "    \n\n";
                } else {
                    logs += `${taskList[i]}  不存在该脚本文件,请确认输入是否有误\n\n`
                    console.log("不存在该脚本文件,请确认输入是否有误")
                }
            }
            console.log("------------任务执行完毕------------\n");
            if (needPush && notify) await sendmsg(logs);
        } catch (err) {
            console.log(err);
        }
        resolve();
    });
}

async function sendmsg(msg){
    await notify.sendNotify(`每日签到任务完成`, msg.replace(/\n/g,"\n\n"))
}

go()
!(async () => {
    await start(signList);
})()