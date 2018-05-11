var NameContract = artifacts.require("NameContract");

module.exports = function(deployer) {
  deployer.deploy(NameContract);
};