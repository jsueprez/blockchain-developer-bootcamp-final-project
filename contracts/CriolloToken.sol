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
        SoldAndLocked,
        SoldAndShipped,
        SoldAndUnlocked
    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    event Purchase(address owner, uint256 price, uint256 id);

    mapping(uint256 => State) public state;
    mapping(uint256 => uint256) public price;
    mapping(uint256 => uint256) public tokenLockedFromTimestamp;

    event TokenUnlocked(uint256 _id, address _unlockerAddress);

    constructor(
        string memory name_,
        string memory symbol_,
        string memory _initBaseURI
    ) ERC721(name_, symbol_) {
        _owner = payable(msg.sender);
        setBaseURI(_initBaseURI);
    }

    function unlockToken(uint256 _id) public isShipped(_id) {
        require(
            msg.sender == ownerOf(_id),
            "CriolloToken: Only the Owner can unlock the Token"
        );
        state[_id] = State.SoldAndUnlocked;
        emit TokenUnlocked(_id, msg.sender);
    }

    modifier onlyForSaleTokens(uint256 _id) {
        require(
            state[_id] == State.ForSale,
            "CriolloToken: This Token is not For sale!!"
        );
        _;
    }

    modifier isShipped(uint256 _id) {
        require(state[_id] == State.SoldAndShipped);
        _;
    }

    modifier onlyLockedTokens(uint256 _id) {
        require(
            state[_id] == State.SoldAndLocked,
            "CriolloToken: This Token has not been sold yet!!"
        );
        _;
    }

    modifier onlyUnlockedTokens(uint256 _id) {
        require(
            state[_id] == State.SoldAndUnlocked,
            "CriolloToken: This Token is not Unlocked!!"
        );
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

    function markAsShipped(uint256 _id) public onlyOwner onlyLockedTokens(_id) {
        require(
            _exists(_id),
            "ERC721: Error, This token has not been minted yet"
        );
        state[_id] = State.SoldAndShipped;
    }

    function listTokenForSale(uint256 _id) public onlyOwner {
        require(
            _exists(_id),
            "ERC721: Error, This token has not been minted yet"
        );
        require(
            ownerOf(_id) == _owner,
            "CriolloToken: Criollo is not the owner of this token anymore!"
        );
        state[_id] = State.ForSale;
    }

    function safeMint(uint256 _price) public payable onlyOwner {
        uint256 _tokenID = _tokenIdCounter.current();

        _safeMint(msg.sender, _tokenID);
        _tokenIdCounter.increment();

        price[_tokenID] = _price;
    }

    modifier isforSale(uint256 _id) {
        require(state[_id] == State.ForSale);
        _;
    }

    function buy(uint256 _id) external payable isforSale(_id) {
        require(_exists(_id), "Error, This token has not been minted yet"); //not exists
        require(
            ownerOf(_id) == _owner,
            'CriolloToken: This token does not belong to Criollo, please use the "trade" function if you want to buy this token.'
        );

        require(msg.value >= price[_id], "Error, Token costs more"); //costs more

        _buy(_id); //buying to contract owner
        emit Purchase(msg.sender, price[_id], _id);
    }

    function trade(uint256 _id) external payable onlyUnlockedTokens(_id) {
        require(_exists(_id), "Error, This token has not been minted yet"); //not exists
        require(
            ownerOf(_id) != _owner,
            'CriolloToken: This token does belong to Criollo, please use the "buy" function if you want to buy this token.'
        );
        require(msg.value >= price[_id], "Error, Token costs more"); //costs more
        _trade(_id); //buying to user
    }

    function _validate(uint256 _id) internal {
        require(_exists(_id), "Error, This token has not been minted yet"); //not exists
        require(msg.value >= price[_id], "Error, Token costs more"); //costs more
    }

    function _buy(uint256 _id) internal {
        _transfer(_owner, msg.sender, _id); //nft to user
        state[_id] = State.SoldAndLocked;
    }

    function _trade(uint256 _id) internal onlyUnlockedTokens(_id) {
        address payable _currentOwner = payable(ERC721.ownerOf(_id));

        _transfer(ERC721.ownerOf(_id), msg.sender, _id); //nft to user

        _currentOwner.transfer(msg.value); //eth to owner
    }
}
