# Design patterns used

## Access Control Design Patterns

- `Ownable`  is a simpler mechanism with a single owner "role" that can be assigned to a single account. For the purpose of this project it was useful when only the owner can do some actions like `Ship an Item, Add a token to the market place, Mints a new token, Withdraw balance `. Future implementations will include an better access control mechanism where different roles can be set.

## Inheritance and Interfaces

- `CriolloToken` contract inherits the OpenZeppelin `ERC721Enumerable` which is a standard for representing ownership of non-fungible tokens, and `Ownable` contract to enable ownership.
