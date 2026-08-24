import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

const CAP = ethers.parseEther("100000000");
const SHOP: [number, string][] = [
  [1, "120"],
  [2, "75"],
  [3, "40"],
  [4, "18"],
  [5, "8"],
  [6, "10"],
  [7, "22"],
  [8, "22"],
  [9, "200"],
];

async function main() {
  const [deployer] = await ethers.getSigners();
  const treasury = process.env.TREASURY || deployer.address;
  const signer = process.env.REWARD_SIGNER || deployer.address;

  const Token = await ethers.getContractFactory("SmartWordToken");
  const swd = await Token.deploy(deployer.address, CAP);
  await swd.waitForDeployment();

  const Items = await ethers.getContractFactory("SmartWordItems");
  const items = await Items.deploy(
    deployer.address,
    "https://smartword.app/items/",
    "https://smartword.app/collection.json"
  );
  await items.waitForDeployment();

  const Vault = await ethers.getContractFactory("RewardVault");
  const vault = await Vault.deploy(deployer.address, await swd.getAddress(), signer);
  await vault.waitForDeployment();

  const Market = await ethers.getContractFactory("Marketplace");
  const market = await Market.deploy(
    deployer.address,
    await swd.getAddress(),
    await items.getAddress(),
    treasury
  );
  await market.waitForDeployment();

  await (await swd.grantRole(await swd.MINTER_ROLE(), await vault.getAddress())).wait();
  await (await items.grantRole(await items.MINTER_ROLE(), await market.getAddress())).wait();

  for (const [id, price] of SHOP) {
    await (await market.setShopPrice(id, ethers.parseEther(price))).wait();
  }

  const addresses = {
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    deployer: deployer.address,
    treasury,
    signer,
    SmartWordToken: await swd.getAddress(),
    SmartWordItems: await items.getAddress(),
    RewardVault: await vault.getAddress(),
    Marketplace: await market.getAddress(),
  };

  const outDir = path.join(__dirname, "..", "deployments");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `${addresses.chainId}.json`), JSON.stringify(addresses, null, 2));
  console.log(addresses);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
