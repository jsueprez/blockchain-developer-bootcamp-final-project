var CriolloToken = artifacts.require("./CriolloToken.sol");

module.exports = function (deployer) {
  deployer.deploy(CriolloToken, 'Criollo Token', 'CRI', 'ipfs/QmdXF9gURi68FeY7sMhKDZ8XAxzMqMvQDMXj4jxnmRmRXp/');
};
