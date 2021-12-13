var CriolloToken = artifacts.require("./CriolloToken.sol");

module.exports = function (deployer) {
  deployer.deploy(CriolloToken, 'Criollo Token', 'CRI', 'ipfs/QmciFv6kbsYEWHzLdsjk4oHxUA7yiUxVHNkk8ZU6fA23uS/');
};
