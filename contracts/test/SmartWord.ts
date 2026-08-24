import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

const CAP = ethers.parseEther("100000000");
const ITEM_PRICES = [0, 120, 75, 40, 18, 8, 10, 22, 22, 200].map((n) => ethers.parseEther(String(n)));

async function deployFixture() {
  const [admin, player, other, treasury, signer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("SmartWordToken");
  const swd = await Token.deploy(admin.address, CAP);

  const Items = await ethers.getContractFactory("SmartWordItems");
  const items = await Items.deploy(admin.address, "https://smartword.app/items/", "https://smartword.app/collection.json");

  const Vault = await ethers.getContractFactory("RewardVault");
  const vault = await Vault.deploy(admin.address, await swd.getAddress(), signer.address);

  const Market = await ethers.getContractFactory("Marketplace");
  const market = await Market.deploy(
    admin.address,
    await swd.getAddress(),
    await items.getAddress(),
    treasury.address
  );

  await swd.grantRole(await swd.MINTER_ROLE(), await vault.getAddress());
  await items.grantRole(await items.MINTER_ROLE(), await market.getAddress());
  await items.grantRole(await items.MINTER_ROLE(), admin.address);
  await market.setShopPrice(5, ITEM_PRICES[5]);

  return { admin, player, other, treasury, signer, swd, items, vault, market };
}

describe("SmartWordToken", () => {
  it("only minters can mint and respects the cap", async () => {
    const { player, swd, vault } = await loadFixture(deployFixture);
    await expect(swd.connect(player).mint(player.address, 1)).to.be.reverted;
    expect(await vault.getAddress()).to.not.equal(ethers.ZeroAddress);
    await swd.grantRole(await swd.MINTER_ROLE(), player.address);
    await swd.connect(player).mint(player.address, ethers.parseEther("3"));
    expect(await swd.balanceOf(player.address)).to.equal(ethers.parseEther("3"));
    await expect(swd.connect(player).mint(player.address, CAP)).to.be.revertedWithCustomError(swd, "CapExceeded");
  });
});

describe("RewardVault", () => {
  it("mints SWD when the backend signature is valid", async () => {
    const { player, other, signer, vault, swd } = await loadFixture(deployFixture);
    const amount = ethers.parseEther("25");
    const deadline = (await time.latest()) + 3600;
    const domain = {
      name: "SmartWordRewards",
      version: "1",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: await vault.getAddress(),
    };
    const types = {
      Claim: [
        { name: "player", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };
    const value = { player: player.address, amount, nonce: 1, deadline };
    await expect(vault.connect(player).claim(amount, 1, deadline, await other.signTypedData(domain, types, value)))
      .to.be.revertedWithCustomError(vault, "InvalidSignature");
    await vault.connect(player).claim(amount, 1, deadline, await signer.signTypedData(domain, types, value));
    expect(await swd.balanceOf(player.address)).to.equal(amount);
    await expect(
      vault.connect(player).claim(amount, 1, deadline, await signer.signTypedData(domain, types, value))
    ).to.be.revertedWithCustomError(vault, "NonceUsed");
  });
});

describe("Marketplace", () => {
  it("sells catalog items for SWD and transfers ownership", async () => {
    const { admin, player, treasury, swd, items, market, vault, signer } = await loadFixture(deployFixture);
    const amount = ethers.parseEther("8");
    const deadline = (await time.latest()) + 3600;
    const domain = {
      name: "SmartWordRewards",
      version: "1",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: await vault.getAddress(),
    };
    const types = {
      Claim: [
        { name: "player", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };
    await vault.connect(player).claim(
      amount,
      7,
      deadline,
      await signer.signTypedData(domain, types, { player: player.address, amount, nonce: 7, deadline })
    );
    await swd.connect(player).approve(await market.getAddress(), amount);
    await expect(market.connect(player).buyFromShop(5, 1))
      .to.emit(market, "ShopPurchase")
      .withArgs(player.address, 5, 1, amount);
    expect(await items.balanceOf(player.address, 5)).to.equal(1);
    expect(await swd.balanceOf(treasury.address)).to.equal(amount);
    expect(admin.address).to.not.equal(ethers.ZeroAddress);
  });

  it("lists and sells a player NFT for SWD", async () => {
    const { admin, player, other, items, swd, market, vault, signer } = await loadFixture(deployFixture);
    await items.mint(player.address, 3, 1);
    await items.connect(player).setApprovalForAll(await market.getAddress(), true);
    await market.connect(player).list(3, 1, ethers.parseEther("12"));

    const payout = ethers.parseEther("12");
    const deadline = (await time.latest()) + 3600;
    const domain = {
      name: "SmartWordRewards",
      version: "1",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: await vault.getAddress(),
    };
    const types = {
      Claim: [
        { name: "player", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };
    await vault.connect(other).claim(
      payout,
      2,
      deadline,
      await signer.signTypedData(domain, types, { player: other.address, amount: payout, nonce: 2, deadline })
    );
    await swd.connect(other).approve(await market.getAddress(), payout);
    await market.connect(other).buy(1, 1);
    expect(await items.balanceOf(other.address, 3)).to.equal(1);
    expect(await items.balanceOf(player.address, 3)).to.equal(0);
    expect(admin.address).to.not.equal(ethers.ZeroAddress);
  });
});
