pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/NameContract.sol";

contract TestNameContract {

	NameContract namecontract = NameContract(DeployedAddresses.NameContract());

	//testing the setfunction()

	function testSetfunction() public {
		namecontract.setName("Mayank");
		string memory returnedName = namecontract.getName();
		string memory expected = "Mayank";

		Assert.equal(returnedName, expected, "Name should be recorded.");
	}

}