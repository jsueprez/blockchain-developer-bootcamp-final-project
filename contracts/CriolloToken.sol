// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CriolloToken is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    string public baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 0 ether;
    uint256 public maxMintAmount = 1;

    enum State {
        ForSale,
        Locked,
        Unlocked,
        Shipped,
        Delivered
    }

    uint256 public listingFee = 0.025 ether;
    uint256 public minPrice = 0.5 ether;

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setListingFee(uint256 _newPrice) public onlyOwner {
        listingFee = _newPrice * (1 ether);
    }

    function setMinimumAssetPrice(uint256 _newPrice) public onlyOwner {
        minPrice = _newPrice * (1 ether);
    }

    mapping(address => uint256) public tokenOwners;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    function safeMint(uint256 _mintAmount) public payable onlyOwner {
        require(balanceOf(msg.sender) == 0, "Only 1 mint per account");
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount);

        uint256 tokenID = _tokenIdCounter.current();

        if (msg.sender != owner()) {
            require(msg.value >= cost * _mintAmount);
        }

        _safeMint(msg.sender, _tokenIdCounter.current());
        _tokenIdCounter.increment();

        tokenOwners[msg.sender] = tokenID;
    }

    function getTokenID(address tokenOwner) public view returns (uint256) {
        return tokenOwners[tokenOwner];
    }
}
