// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {SmartWordToken} from "./SmartWordToken.sol";

/// @title Reward vault
/// @notice Players earn SWD off-chain. The API signs a claim; this contract mints on withdraw.
contract RewardVault is Ownable, Pausable, ReentrancyGuard, EIP712 {
    bytes32 public constant CLAIM_TYPEHASH =
        keccak256("Claim(address player,uint256 amount,uint256 nonce,uint256 deadline)");

    SmartWordToken public immutable swd;
    address public trustedSigner;
    mapping(address player => mapping(uint256 nonce => bool used)) public usedNonces;

    error ZeroAddress();
    error InvalidAmount();
    error ExpiredDeadline();
    error NonceUsed();
    error InvalidSignature();

    event SignerUpdated(address indexed signer);
    event Claimed(address indexed player, uint256 amount, uint256 nonce);

    constructor(address admin, address swd_, address signer_) Ownable(admin) EIP712("SmartWordRewards", "1") {
        if (admin == address(0) || swd_ == address(0) || signer_ == address(0)) revert ZeroAddress();
        swd = SmartWordToken(swd_);
        trustedSigner = signer_;
    }

    function claim(uint256 amount, uint256 nonce, uint256 deadline, bytes calldata signature)
        external
        whenNotPaused
        nonReentrant
    {
        if (amount == 0) revert InvalidAmount();
        if (block.timestamp > deadline) revert ExpiredDeadline();
        if (usedNonces[msg.sender][nonce]) revert NonceUsed();

        bytes32 digest = _hashTypedDataV4(
            keccak256(abi.encode(CLAIM_TYPEHASH, msg.sender, amount, nonce, deadline))
        );
        if (ECDSA.recover(digest, signature) != trustedSigner) revert InvalidSignature();

        usedNonces[msg.sender][nonce] = true;
        swd.mint(msg.sender, amount);
        emit Claimed(msg.sender, amount, nonce);
    }

    function setTrustedSigner(address signer_) external onlyOwner {
        if (signer_ == address(0)) revert ZeroAddress();
        trustedSigner = signer_;
        emit SignerUpdated(signer_);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
