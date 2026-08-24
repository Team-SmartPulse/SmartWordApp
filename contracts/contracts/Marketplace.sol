// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {SmartWordItems} from "./SmartWordItems.sol";

/// @title SWD marketplace
/// @notice Catalog shop (mints from treasury) plus peer-to-peer ERC-1155 listings paid in SWD.
contract Marketplace is Ownable, Pausable, ReentrancyGuard, IERC1155Receiver {
    using SafeERC20 for IERC20;

    struct Listing {
        address seller;
        uint256 id;
        uint256 amount;
        uint256 pricePerUnit;
        bool active;
    }

    IERC20 public immutable swd;
    SmartWordItems public immutable items;
    address public treasury;
    uint256 public nextListingId = 1;
    uint16 public feeBps = 250;

    mapping(uint256 itemId => uint256 priceSwd) public shopPrices;
    mapping(uint256 listingId => Listing) public listings;

    error ZeroAddress();
    error InvalidPrice();
    error UnknownItem();
    error InactiveListing();
    error NotSeller();
    error FeeTooHigh();
    error InvalidAmount();

    event ShopPriceSet(uint256 indexed id, uint256 price);
    event ShopPurchase(address indexed buyer, uint256 indexed id, uint256 amount, uint256 paid);
    event Listed(uint256 indexed listingId, address indexed seller, uint256 id, uint256 amount, uint256 pricePerUnit);
    event Sale(uint256 indexed listingId, address indexed buyer, uint256 amount, uint256 paid);
    event Cancelled(uint256 indexed listingId);

    constructor(address admin, address swd_, address items_, address treasury_) Ownable(admin) {
        if (admin == address(0) || swd_ == address(0) || items_ == address(0) || treasury_ == address(0)) {
            revert ZeroAddress();
        }
        swd = IERC20(swd_);
        items = SmartWordItems(items_);
        treasury = treasury_;
    }

    function setShopPrice(uint256 id, uint256 priceSwd) external onlyOwner {
        if (id < 1 || id > items.MAX_ITEM_ID()) revert UnknownItem();
        shopPrices[id] = priceSwd;
        emit ShopPriceSet(id, priceSwd);
    }

    function buyFromShop(uint256 id, uint256 amount) external whenNotPaused nonReentrant {
        if (amount == 0) revert InvalidAmount();
        uint256 unitPrice = shopPrices[id];
        if (unitPrice == 0) revert UnknownItem();
        uint256 paid = unitPrice * amount;
        swd.safeTransferFrom(msg.sender, treasury, paid);
        items.mint(msg.sender, id, amount);
        emit ShopPurchase(msg.sender, id, amount, paid);
    }

    function list(uint256 id, uint256 amount, uint256 pricePerUnit) external whenNotPaused returns (uint256 listingId) {
        if (amount == 0) revert InvalidAmount();
        if (pricePerUnit == 0) revert InvalidPrice();
        items.safeTransferFrom(msg.sender, address(this), id, amount, "");
        listingId = nextListingId++;
        listings[listingId] = Listing({
            seller: msg.sender,
            id: id,
            amount: amount,
            pricePerUnit: pricePerUnit,
            active: true
        });
        emit Listed(listingId, msg.sender, id, amount, pricePerUnit);
    }

    function buy(uint256 listingId, uint256 amount) external whenNotPaused nonReentrant {
        Listing storage listing = listings[listingId];
        if (!listing.active) revert InactiveListing();
        if (amount == 0 || amount > listing.amount) revert InvalidAmount();

        uint256 paid = listing.pricePerUnit * amount;
        uint256 fee = (paid * feeBps) / 10_000;
        swd.safeTransferFrom(msg.sender, listing.seller, paid - fee);
        if (fee > 0) swd.safeTransferFrom(msg.sender, treasury, fee);

        listing.amount -= amount;
        if (listing.amount == 0) listing.active = false;

        items.safeTransferFrom(address(this), msg.sender, listing.id, amount, "");
        emit Sale(listingId, msg.sender, amount, paid);
    }

    function cancel(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        if (!listing.active) revert InactiveListing();
        if (listing.seller != msg.sender && msg.sender != owner()) revert NotSeller();
        listing.active = false;
        items.safeTransferFrom(address(this), listing.seller, listing.id, listing.amount, "");
        listing.amount = 0;
        emit Cancelled(listingId);
    }

    function setFeeBps(uint16 bps) external onlyOwner {
        if (bps > 1_000) revert FeeTooHigh();
        feeBps = bps;
    }

    function setTreasury(address treasury_) external onlyOwner {
        if (treasury_ == address(0)) revert ZeroAddress();
        treasury = treasury_;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function onERC1155Received(address, address, uint256, uint256, bytes calldata) external pure returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) external pure returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return interfaceId == type(IERC1155Receiver).interfaceId;
    }
}
