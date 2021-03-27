pragma solidity 0.6.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Zrx is ERC20 {
  constructor() public ERC20('ZRX', '0x token') {}

  function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
}
