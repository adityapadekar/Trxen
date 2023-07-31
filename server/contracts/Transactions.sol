// SPDX-License-Identifier:MIT
pragma solidity ^0.8.8;

contract Transactions {
    uint256 private s_transactionCount;

    event Transfer(
        address indexed from,
        address indexed receiver,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] private s_transactions;

    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message
    ) public {
        s_transactionCount++;
        s_transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp
            )
        );

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return s_transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return s_transactionCount;
    }
}
