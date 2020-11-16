# Design Pattern Decisions

As an introduction, I want to mention that I have worked on reducing unnecessary code execution and ensure the smart contracts workflow is simple. I have also reused audited code as is the case of smart contracts `Ownable.sol` and `SafeMath.sol` from [Zeppelin Solidity](https://github.com/OpenZeppelin/openzeppelin-solidity).

These are the design patterns I have implemented and the reasons why:
 - Ownership pattern.
 - Integer arithmetic under/overflow.
 - Fail Early and Fail Loud
 - Restricted Access

## Ownership pattern
The smart contract at the time of deployemnt runs the constructor in which the `msg.sender` (i.e. the deployer of the contract) is assigned the owner role.
An owner can also update/change the ownership to a new address.

## Integer arithmetic under/overflow
I have decided to use SafeMath library from Open Zeppelin to avoid problems with arithmetic operations.
```
using SafeMath for uin256;
```

## Fail Early and Fail Loud
I tried to write the functions so that I would know as early as possible if something was failing. Made sure to use requires and stop the code from executing if it didn't need to.

## Restricted Access
Utilized require() to prevent addresses from comprimising the contract
