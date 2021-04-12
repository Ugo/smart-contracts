// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract Escrow {
    address public payer;
    address payable public recipient;
    address public lawyer;
    uint public amount;

    constructor(
        address _payer,
        address payable _recipient,
        uint _amount) {
            payer = _payer;
            recipient = _recipient;
            lawyer = msg.sender;
            amount = _amount;
    }

    function deposit() payable public {
        require(msg.sender == payer, "Sender must be the payer");
        require(msg.value <= amount, "Cannot send more than the escrow amount");
    }

    function release() public {
        require(msg.sender == lawyer, "Only lawyer can release");
        require(address(this).balance == amount, "Cannot send the funds before full amount is reached");
        recipient.transfer(amount);
    }

    function balanceOf() view public returns (uint) {
        return address(this).balance;
    }

}