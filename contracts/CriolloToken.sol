// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CriolloToken is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(address => uint256) public tokenOwners;

    constructor() ERC721("CriolloToken", "CRI") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenID = _tokenIdCounter.current();

        _safeMint(to, _tokenIdCounter.current());
        _tokenIdCounter.increment();

        tokenOwners[to] = tokenID;
    }

    function getTokenID(address tokenOwner) public view returns (uint256) {
        return tokenOwners[tokenOwner];
    }
}
