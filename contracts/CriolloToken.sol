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
        NotListed,
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
    mapping(uint256 => State) public state;
    mapping(uint256 => uint256) public price;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        _owner = payable(msg.sender);
        setBaseURI(_initBaseURI);
    }

    modifier onlyForSaleTokens(uint256 _id) {
        require(state[_id] == State.ForSale, "This Token is not For sale!!");
        _;
    }

    modifier onlyUnlockedTokens(uint256 _id) {
        require(state[_id] == State.Unlocked, "This Token is not Unlocked!!");
        _;
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

    function markAsShipped(uint256 _id) public onlyOwner {
        require(_exists(_id), "ERC721: operator query for nonexistent token");
        state[_id] = State.Shipped;
    }

    function listTokenForSale(uint256 _id) public onlyOwner {
        require(_exists(_id), "ERC721: operator query for nonexistent token");
        state[_id] = State.ForSale;
    }

    function safeMint(uint256 _price) public payable onlyOwner {
        uint256 _tokenID = _tokenIdCounter.current();

        //_mint(address(this), _tok_tokenIDenId);
        //_setTokenURI(_tokenId, _tokenURI);

        _safeMint(msg.sender, _tokenID);
        _tokenIdCounter.increment();

        tokenOwners[msg.sender] = _tokenID;
        price[_tokenID] = _price;
    }

    function getTokenID(address tokenOwner) public view returns (uint256) {
        return tokenOwners[tokenOwner];
    }

    function getState(uint256 _tokenID) public view returns (State) {
        return state[_tokenID];
    }

    function buy(uint256 _id) external payable onlyForSaleTokens(_id) {
        _validate(_id);

        if (ERC721.ownerOf(_id) == _owner) {
            _buy(_id); //buying to contract owner
        } else {
            _trade(_id); //buying to user
        }

        emit Purchase(msg.sender, price[_id], _id);
    }

    function _validate(uint256 _id) internal {
        require(_exists(_id), "Error, wrong Token id"); //not exists
        require(msg.value >= price[_id], "Error, Token costs more"); //costs more
    }

    function _buy(uint256 _id) internal {
        _transfer(_owner, msg.sender, _id); //nft to user
        state[_id] = State.Locked;
        //sold[_id] = true; //nft is sold
    }

    function _trade(uint256 _id) internal onlyUnlockedTokens(_id) {
        address payable _currentOwner = payable(ERC721.ownerOf(_id));

        _transfer(ERC721.ownerOf(_id), msg.sender, _id); //nft to user

        _currentOwner.transfer(msg.value); //eth to owner
        //sold[_id] = true; //nft is sold
    }
}
