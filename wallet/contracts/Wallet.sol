// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;


contract Wallet {
    address[] public approvers;
    uint public quorum;
    struct Transfer {
        uint id;
        uint amount;
        address payable to;
        uint approvals;
        bool sent;
    }
    Transfer[] public transfers;
    mapping(address => mapping(uint => bool)) public approvals;

    constructor(address[] memory _approvers, uint _quorum) {
        approvers = _approvers;
        quorum = _quorum;
    }

    function getApprovers() external view returns(address[] memory) {
        return approvers;
    }

    function createTransfer(uint _amount, address payable _to) external onlyApprover() {
        transfers.push(Transfer(
            transfers.length,
            _amount,
            _to,
            0,
            false));
    }

    function getTransfers() external view returns(Transfer[] memory) {
        return transfers;
    }

    function approveTransfer(uint id) external onlyApprover() {
        require(transfers[id].sent == false, "Transfer has already been sent");
        require(approvals[msg.sender][id] == false, "Transfer has already been approved");

        approvals[msg.sender][id] = true;
        transfers[id].approvals++;

        // check if quorum is reached
        if(transfers[id].approvals >= quorum) {
            // send
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint amount = transfers[id].amount;
            to.transfer(amount);

        }
    }

    // allows the smart contract to receive some ether
    receive() external payable {

    }

    modifier onlyApprover() {
        bool allowed = false;
        for(uint i = 0; i < approvers.length; i++) {
            if(approvers[i] == msg.sender){
                allowed = true;
            }
        }

        require(allowed == true, 'Only approver allowed');
        _;
    }
}
