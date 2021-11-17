// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CriolloToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    address payable public _owner;
    Counters.Counter private _tokenIdCounter;

    string public baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 0.25 ether;
    uint256 public maxMintAmount = 1;

    enum State {
        ForSale,
        Locked,
        Unlocked,
        Shipped,
        Delivered
    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    event Purchase(address owner, uint256 price, uint256 id);

    mapping(address => uint256) public tokenOwners;
    mapping(uint256 => uint8) public state;
    mapping(uint256 => uint256) public price;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        _owner = payable(msg.sender);
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

    function safeMint(uint256 _price) public payable onlyOwner {
        uint256 _tokenID = _tokenIdCounter.current();

        //_mint(address(this), _tok_tokenIDenId);
        //_setTokenURI(_tokenId, _tokenURI);

        _safeMint(msg.sender, _tokenID);
        _tokenIdCounter.increment();

        tokenOwners[msg.sender] = _tokenID;
        price[_tokenID] = _price;
        state[_tokenID] = State.ForSale;
    }

    function getTokenID(address tokenOwner) public view returns (uint256) {
        return tokenOwners[tokenOwner];
    }

    function getState(uint256 _tokenID) public view returns (State) {
        return state[_tokenID];
    }

    function buy(uint256 _id) external payable {
        _validate(_id); //check req. for trade
        _trade(_id); //swap nft for eth

        emit Purchase(msg.sender, price[_id], _id);
    }

    function _validate(uint256 _id) internal {
        require(_exists(_id), "Error, wrong Token id"); //not exists
        //require(!sold[_id], "Error, Token is sold"); //already sold
        require(msg.value >= price[_id], "Error, Token costs more"); //costs more
    }

    function _trade(uint256 _id) internal {
        _transfer(address(this), msg.sender, _id); //nft to user
        _owner.transfer(msg.value); //eth to owner
        sold[_id] = true; //nft is sold
    }
}
