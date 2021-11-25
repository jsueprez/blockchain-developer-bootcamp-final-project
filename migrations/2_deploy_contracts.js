var CriolloToken = artifacts.require("./CriolloToken.sol");

module.exports = function (deployer) {
  deployer.deploy(CriolloToken, 'Criollo Token', 'CRI', 'ipfs://QmP3FwwLdsf7KJkhndK7KeHoyjpfYe3d9iSdhFH3oV9eXD/');
};
