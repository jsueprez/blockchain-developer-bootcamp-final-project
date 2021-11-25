# Contract security measures

## SWC-103 (Floating pragma)

Specific compiler pragma `0.8.3` used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## SWC-105 (Unprotected Ether Withdrawal)

`withdraw` is protected with OpenZeppelin `Ownable`'s `onlyOwner` modifier.

## SWC-134 (Unprotected Ether Withdrawal)

`withdraw` is protected with OpenZeppelin `Ownable`'s `onlyOwner` modifier.

## SWC-104 (Unchecked Call Return Value)

The return value from a call from the current owner of the token is checked with `require` to ensure transaction rollback if call fails.

### SWC-118 Incorrect Constructor Name

## Modifiers used only for validation

All modifiers in contract(s) only validate data with `require` statements.

## Pull over push

All functions that modify state are based on receiving calls rather than making contract calls.
