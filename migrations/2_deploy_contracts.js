var CriolloToken = artifacts.require("./CriolloToken.sol");

module.exports = function (deployer) {
  deployer.deploy(CriolloToken, 'Criollo Token', 'CRI', 'someURI');
};
