// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title A contract for storing and trade the Criollo tokens.
/// @author Josue Perez
/// @notice You can use this contract to operate the supply chain and also to make operation with your NFT
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
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

    string public baseURI;
    string public baseExtension = ".json";

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => Criollo) criollos;

    modifier canBeListed(uint256 _id) {
        require(
            criollos[_id].state == State.NotListed, 
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

    /// @notice Mints a new token and creates a new Item in the supply chain
    /// @dev The token id is incremented automatically using Counters.sol
    /// @param _price Initial price for the token.
    function safeMint(uint256 _price) public payable onlyOwner {
        uint256 _tokenId = _tokenIdCounter.current();

        _safeMint(msg.sender, _tokenId);

        criollos[_tokenId] = Criollo({
            price: _price,
            tokenId: _tokenId,
            state: State.NotListed,
            tokenOwner: payable(owner())
        });

        emit NewTokenMinted(_tokenId);

        _tokenIdCounter.increment();
    }

    /// @notice Add a token to the market place
    /// @dev This function can only be used for the contract owner to make the token available to others users.
    /// @param _id Id of the token.
    /// @param _price Price for the token.
    function addToMarketPlace(uint256 _id, uint256 _price)
        public
        canBeListed(_id)
        onlyOwner
    {
        require(
            _exists(_id),
            "CriolloToken: Error, This token has not been minted yet"
        );
        criollos[_id].state = State.ForSale;
        criollos[_id].price = _price;
    }

    /// @notice Fetch a token by Id
    /// @dev Use this function whenever you need info about a token
    /// @param _tokenId Id of the token.
    /// @return tokenId - The Id of the token
    /// @return price - The price of the token
    /// @return state - The state of the token
    /// @return tokenOwner - The owner's address of the token
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

    /// @notice Buy a token
    /// @dev _buyFromCriollo when the token is bough from Criollo Marketplace, _buyFromUser when the token is bought(trade) out of the Marketplace
    /// @param _id Id of the token.
    function buy(uint256 _id)
        external
        payable
        forSale(_id)
        paidEnough(criollos[_id].price)
    {
        require(
            _exists(_id),
            "CriolloToken: Error, This token has not been minted yet"
        );
        address payable _currentOwner = criollos[_id].tokenOwner;

        _transfer(ownerOf(_id), msg.sender, _id);
        _currentOwner.transfer(msg.value);

        criollos[_id].tokenOwner = payable(msg.sender);

        if (criollos[_id].state == State.ForSale) {
            criollos[_id].state = State.Locked;
        }

        emit Purchase(msg.sender, criollos[_id].price, criollos[_id].tokenId);
    }

    /// @notice Ship an Item
    /// @dev Only the contract owner can ship an Item, the token should be Bought first
    /// @param _id Id of the token.
    function shipped(uint256 _id) public onlyOwner isLocked(_id) {
        require(
            _exists(_id),
            "CriolloToken: Error, This token has not been minted yet"
        );
        criollos[_id].state = State.Shipped;
    }

    /// @notice Unlock a Token
    /// @dev Need to be the owner of the token
    /// @param _id Id of the token.
    function unlockToken(uint256 _id) public isShipped(_id) {
        require(
            ownerOf(_id) == msg.sender,
            "CriolloToken: Error, You are not the token owner!"
        );
        criollos[_id].state = State.Unlocked;
    }

    /// @notice Withdraw balance
    /// @dev From the contract owner to specific balance.
    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        require(
            criollos[tokenId].state == State.Unlocked ||
                ownerOf(tokenId) == owner(),
            "CriolloToken: Error, This token is not Locked for been transfer !"
        );
        super._transfer(from, to, tokenId);
    }
}
