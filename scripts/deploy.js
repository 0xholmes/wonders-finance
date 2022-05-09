const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);

  const WondersFinance = await hre.ethers.getContractFactory("WondersFinance");
  const wondersFinance = await WondersFinance.deploy(token.address);
  await wondersFinance.deployed();
  console.log("WondersFinance deployed to:", wondersFinance.address);

  await token.passMinterRole(wondersFinance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
