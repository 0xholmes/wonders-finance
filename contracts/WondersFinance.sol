// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract WondersFinance {
    Token private token;

    mapping(address => uint256) public addrToDeposit;
    mapping(address => uint) public depositStart;
    mapping(address => bool) public isDeposited;

    event Deposit(address indexed user, uint amount, uint timeStart);
    event Withdraw(address indexed user, uint amount, uint depositTime, uint interest);

    constructor (Token _token) {
        token = _token;
    }

    function deposit() public payable {
        require(isDeposited[msg.sender] == false, "Deposit already active");
        require(msg.value >= 0.001 * 10 ** 18, "Minimum is 0.001 ETH");
        
        addrToDeposit[msg.sender] += msg.value;
        depositStart[msg.sender] = block.timestamp;
        isDeposited[msg.sender] = true;

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    function withdraw() public {
        require(isDeposited[msg.sender] == true, "No previous deposit");
        
        uint256 totalDeposit = addrToDeposit[msg.sender];
        uint256 depositTime = block.timestamp - depositStart[msg.sender];

        uint256 interestPerSecond = 100000000000000 * (addrToDeposit[msg.sender] / 1e16);
        uint256 interest = interestPerSecond * depositTime;

        payable(msg.sender).transfer(totalDeposit);
        token.mint(msg.sender, interest);

        addrToDeposit[msg.sender] = 0 ;
        depositStart[msg.sender] = 0;
        isDeposited[msg.sender] = false;

        emit Withdraw(msg.sender, totalDeposit, depositTime, interest);
    }

    function tvl() public view returns(uint256) {
        return address(this).balance;
    }

    function myBalance() public view returns(uint256) {
        return addrToDeposit[msg.sender];
    }
}