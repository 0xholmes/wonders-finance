// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public minter;

    event MinterRoleChanged(address from, address to);

    constructor() ERC20("Wonders Finance Token", "1DER") {
        minter = msg.sender;
    }

    function mint(address _account, uint256 _amount) public onlyMinter {
        _mint(_account, _amount);
    }

    function passMinterRole(address _wondersFinance) public onlyMinter {
        minter = _wondersFinance;
        emit MinterRoleChanged(msg.sender, _wondersFinance);
    }

    modifier onlyMinter {
      require(msg.sender == minter, "You don't have minter role");
      _;
   }
}