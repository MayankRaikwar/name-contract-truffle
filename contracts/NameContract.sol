pragma solidity ^0.4.18;

contract  NameContract{
    
    string public name = "Mayank";

    function setName(string newName) public {
        name = newName;
    }
    
    function getName() public view returns (string) {
        return name;
    }
}