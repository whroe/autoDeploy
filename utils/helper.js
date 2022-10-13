async function helper(config,type){
    let  value = {}
    value.value = config[type]
    return value
  }
  module.exports = helper