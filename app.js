const config = require ('./config')
const helper = require ('./utils/helper')
const compressFile = require ('./utils/compressFile')
const {sshServer , ssh} = require ('./utils/ssh')
const uploadFile = require ('./utils/uploadFile')
const runCommand = require ('./utils/handleCommand')

// 主程序(可单独执行)
async function main () {
  try {
    console.log('请确保文件解压后为dist目录!!!')

    const SELECT_CONFIG = (await helper(config,'dev')).value // 所选部署项目的配置信息
    console.log(SELECT_CONFIG,'是的撒大苏打的')
    console.log('您选择了部署 ' + SELECT_CONFIG.name)
    const localFile =  __dirname + '/' + SELECT_CONFIG.targetFile // 待上传本地文件
    SELECT_CONFIG.openCompress ? await compressFile(SELECT_CONFIG.targetDir, localFile) : '' //压缩
    let ssh2 = await sshServer(SELECT_CONFIG.ssh)
      let res= await uploadFile(ssh2, SELECT_CONFIG, localFile) // 上传
      let res1= await runCommand(ssh2, 'unzip ' + SELECT_CONFIG.targetFile, SELECT_CONFIG.deployDir) // 解压
      let res2= await runCommand(ssh2, 'mv dist ' + SELECT_CONFIG.releaseDir, SELECT_CONFIG.deployDir) // 修改文件名称
      let res3= await runCommand(ssh2, 'rm -f ' + SELECT_CONFIG.targetFile, SELECT_CONFIG.deployDir) // 删除
      console.log(res)
      console.log(res1)
      console.log(res2)
      console.log(res3)
    // })
    // await sshServer(SELECT_CONFIG.ssh)
    // 连接
  
  } catch (err) {
    console.log('部署过程出现错误！', err)
  } finally {
    process.exit()
  }
}
// {
//   name: '自动发布-dev',
//   ssh: {
//     host: '121.40.236.199',
//     port: 22,
//     username: 'root',
//     password: 'Spy513700',
//     // privateKey: 'E:/id_rsa', // ssh私钥(不使用此方法时请勿填写， 注释即可)
//     passphrase: 'Spy513700' // ssh私钥对应解密密码(不存在设为''即可)
//   },
//   targetDir: 'C:/Users/Administrator/Desktop/reactMan/react/dist', // 目标压缩目录(可使用相对地址)
//   targetFile: 'dist.zip', // 目标文件
//   openCompress: true, // 是否开启本地压缩
//   openBackUp: true, // 是否开启远端备份
//   deployDir: '/home/node_test' + '/', // 远端目录
//   releaseDir: 'web' // 发布目录
// }

main()