const hre = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();
  console.log("Deploying contract...");

  await nftMarketplace.waitForDeployment();

  const deployedAddress = nftMarketplace.target || nftMarketplace.address;

  console.log(
    `Deployed contract address: ${deployedAddress}` 
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
