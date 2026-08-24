// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/// @title SmartWord game items
/// @notice ERC-1155 catalog: characters, avatars, power-ups, letter packs, specials.
contract SmartWordItems is ERC1155, AccessControl, Pausable {
    using Strings for uint256;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    uint256 public constant MAX_ITEM_ID = 9;
    string public contractURI;

    error ZeroAddress();
    error UnknownItem();

    event ContractURIUpdated(string uri);

    constructor(address admin, string memory baseUri, string memory contractURI_) ERC1155(baseUri) {
        if (admin == address(0)) revert ZeroAddress();
        contractURI = contractURI_;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(PAUSER_ROLE, admin);
    }

    function mint(address to, uint256 id, uint256 amount) external onlyRole(MINTER_ROLE) {
        if (to == address(0)) revert ZeroAddress();
        if (id < 1 || id > MAX_ITEM_ID) revert UnknownItem();
        _mint(to, id, amount, "");
    }

    function mintBatch(address to, uint256[] calldata ids, uint256[] calldata amounts) external onlyRole(MINTER_ROLE) {
        if (to == address(0)) revert ZeroAddress();
        for (uint256 i; i < ids.length; ++i) {
            if (ids[i] < 1 || ids[i] > MAX_ITEM_ID) revert UnknownItem();
        }
        _mintBatch(to, ids, amounts, "");
    }

    function setURI(string calldata newUri) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setURI(newUri);
    }

    function setContractURI(string calldata newUri) external onlyRole(DEFAULT_ADMIN_ROLE) {
        contractURI = newUri;
        emit ContractURIUpdated(newUri);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function uri(uint256 id) public view override returns (string memory) {
        return string.concat(super.uri(id), id.toString(), ".json");
    }

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override whenNotPaused {
        super._update(from, to, ids, values);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
