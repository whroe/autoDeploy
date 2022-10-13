// ssh.js
const {NodeSSH} = require('node-ssh')
const ssh = new NodeSSH()


function sshServer (sshInfo) {
  return new Promise((resolve, reject) => {
    ssh.connect({ ...sshInfo }).then(() => {
      console.log('3-' + sshInfo.host + ' 连接成功')
      resolve(ssh)
    }).catch((err) => {
      reject(console.error('3-' + sshInfo.host + ' 连接失败', err))
    })
  })
}
module.exports = {
  sshServer,
  ssh
}