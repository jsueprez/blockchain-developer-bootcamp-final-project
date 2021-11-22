// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CriolloToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    event Purchase(address owner, uint256 price, uint256 id);
    event TokenUnlocked(uint256 _id, address _unlockerAddress);
    event NewTokenMinted(uint256 _tokenId);

    enum State {
        NotListed,
        ForSale,
        Locked,
        Shipped,
        Unlocked
    }
    struct Criollo {
        uint256 tokenId;
        uint256 price;
        State state;
        address payable tokenOwner;
    }

    address payable public _owner;
    string public baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 0.25 ether;
    uint256 public maxMintAmount = 1;

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => Criollo) criollos;

    modifier isMinted(uint256 _id) {
        require(
            _exists(_id),
            "CriolloToken: Error, This token has not been minted yet"
        );
        _;
    }
    modifier isOwner(uint256 _id) {
        require(
            ownerOf(_id) == msg.sender,
            "CriolloToken: Error, You are not the token owner!"
        );
        _;
    }

    modifier canBeListed(uint256 _id) {
        require(
            criollos[_id].state == State.NotListed ||
                criollos[_id].state == State.Unlocked,
            "CriolloToken: Error, This token can not be listed!"
        );
        _;
    }

    modifier isUnlocked(uint256 _id) {
        require(
            criollos[_id].state == State.Unlocked,
            "CriolloToken: Error, This token is not Unlocked !"
        );
        _;
    }

    modifier isLocked(uint256 _id) {
        require(
            criollos[_id].state == State.Locked,
            "CriolloToken: Error, This token has not been Locked!"
        );
        _;
    }

    modifier isShipped(uint256 _id) {
        require(
            criollos[_id].state == State.Shipped,
            "CriolloToken: Error, This token has not been Shipped!"
        );
        _;
    }

    modifier forSale(uint256 _id) {
        require(
            criollos[_id].state == State.ForSale ||
                criollos[_id].state == State.Unlocked,
            "CriolloToken: Error, This token is not for sale"
        );
        _;
    }

    modifier paidEnough(uint256 _price) {
        require(msg.value >= _price, "CriolloToken: Error, Token cost more");
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        string memory _initBaseURI
    ) ERC721(name_, symbol_) {
        _owner = payable(msg.sender);
        setBaseURI(_initBaseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
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

    function safeMint(uint256 _price) public payable onlyOwner {
        uint256 _tokenId = _tokenIdCounter.current();

        _safeMint(msg.sender, _tokenId);

        criollos[_tokenId] = Criollo({
            price: _price,
            tokenId: _tokenId,
            state: State.NotListed,
            tokenOwner: _owner
        });

        emit NewTokenMinted(_tokenId);

        _tokenIdCounter.increment();
    }

    function addToMarketPlace(uint256 _id, uint256 _price)
        public
        isMinted(_id)
        isOwner(_id)
        canBeListed(_id)
    {
        criollos[_id].state = State.ForSale;
        criollos[_id].price = _price;
    }

    function getCriollo(uint256 _tokenId)
        public
        view
        returns (
            uint256 tokenId,
            uint256 price,
            uint256 state,
            address tokenOwner
        )
    {
        tokenId = criollos[_tokenId].tokenId;
        price = criollos[_tokenId].price;
        state = uint256(criollos[_tokenId].state);
        tokenOwner = criollos[_tokenId].tokenOwner;
        return (tokenId, price, state, tokenOwner);
    }

    function buy(uint256 _id)
        external
        payable
        isMinted(_id)
        forSale(_id)
        paidEnough(criollos[_id].price)
    {
        if (criollos[_id].tokenOwner == _owner) {
            _buyFromCriollo(_id);
        } else {
            _buyFromUser(_id);
        }

        emit Purchase(msg.sender, criollos[_id].price, criollos[_id].tokenId);
    }

    function shipped(uint256 _id) public onlyOwner isMinted(_id) isLocked(_id) {
        criollos[_id].state = State.Shipped;
    }

    function unlockToken(uint256 _id) public isShipped(_id) isOwner(_id) {
        criollos[_id].state = State.Unlocked;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    function _buyFromCriollo(uint256 _id) internal {
        _transfer(_owner, msg.sender, _id);
        _owner.transfer(msg.value);

        criollos[_id].tokenOwner = payable(msg.sender);
        criollos[_id].state = State.Locked;
    }

    function _buyFromUser(uint256 _id) internal isUnlocked(_id) {
        address payable _currentOwner = criollos[_id].tokenOwner;

        _transfer(_currentOwner, msg.sender, _id);
        _currentOwner.transfer(msg.value);
        criollos[_id].tokenOwner = payable(msg.sender);
    }
}
