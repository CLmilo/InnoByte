// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import './ERC721Connector.sol';

contract InnoByte is ERC721Connector {

    // matriz para guardar nuestros nfts
    string[] public InnoByteNFTS;

    mapping(string => bool) _innobyteNFTExists;

    function mint(string memory _innobyte) public {

        require(!_innobyteNFTExists[_innobyte], 'Error - token already exists');

        InnoByteNFTS.push(_innobyte);
        uint _id = InnoByteNFTS.length -1;

        _mint(msg.sender, _id);

        _innobyteNFTExists[_innobyte] = true;
    }

    constructor() ERC721Connector('InnoByte','MOTT') {}

}
