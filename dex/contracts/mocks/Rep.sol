pragma solidity 0.6.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Rep is ERC20 {
  constructor() public ERC20('REP', 'Augur token') {}

  function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
}
