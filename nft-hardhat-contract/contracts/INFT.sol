// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface INFT  {

    event Attest(address indexed to, uint256 indexed tokenId );
    event Revoke(address indexed to, uint256 indexed tokenId );


    function safeMint(address to, uint256 expiration, string memory tokenUri) external;
    function setTokenURI(uint256 tokenId,string memory tokenUri) external;
    function remainigNftsToBeSold() external view returns(uint256);
    function burn(uint256 tokenId) external;
    function hasExpired(uint256 tokenId) external view returns (bool);
    function _burn(uint256 tokenId) external;
    function revoke(uint256 tokenId) external; 
    function tokenURI(uint256 tokenId) external view returns (string memory);



    
}