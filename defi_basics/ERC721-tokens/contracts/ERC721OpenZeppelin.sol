pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';


// simple contract
contract ERC721OpenZeppelin1 is ERC721 {
    constructor() ERC721('Token name', 'Token symbol') {}
}

// contract minting in the constructor
contract ERC721OpenZeppelin2 is ERC721 {
    constructor() ERC721('Token name', 'Token symbol') {
        _safeMint(msg.sender, 0);
    }
}

// contract minting for the admin when the method is called
contract ERC721OpenZeppelin3 is ERC721 {
    address public admin;

    constructor() ERC721('Token name', 'Token symbol') {
        admin = msg.sender;
    }

    function mint(address to, uint tokenId) external {
        require(msg.sender == admin, 'only admin');
        _safeMint(to, tokenId);
    }
}

// contract with a faucet for development
contract ERC721OpenZeppelin4 is ERC721 {
    
    constructor() ERC721('Token name', 'Token symbol') {}

    function faucet(address to, uint tokenId) external {
        _safeMint(to, tokenId);
    }
}