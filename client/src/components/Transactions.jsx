import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import img from "../../images/transaction.png";
const TransactionsCard = ({
    addressTo,
    addressFrom,
    timestamp,
    message,
    amount,
}) => {
    //https://sepolia.etherscan.io/address/0xf903acb994cd29de00f6270a9b44d8a17e1c8dee
    return (
        <div
            className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
        >
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a
                        href={`https://sepolia.etherscan.io/address/${addressFrom}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="text-white text-base">
                            From : {shortenAddress(addressFrom)}
                        </p>
                    </a>
                    <a
                        href={`https://sepolia.etherscan.io/address/${addressFrom}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="text-white text-base">
                            From : {shortenAddress(addressTo)}
                        </p>
                    </a>
                    <p className="text-white text-base">Amount: {amount}</p>
                    {message && (
                        <>
                            <p className="text-white text-base">
                                message : {message}
                            </p>
                        </>
                    )}
                    <div className="flex flex-col justify-center items-center w-full">
                        <div className="flex flex-col justify-center items-center w-1/2 h-40 2xl:h-48">
                            <img
                                src={img}
                                alt="nature"
                                className="object-contain rounded-md shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="bg-black p-3 px-5 w-max rounded-3xl mt-5 shadow-2xl">
                        <p className="text-[#37c7da] font-bold">{timestamp}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Transactions = () => {
    const { currentAccount, transactions } = useContext(TransactionContext);
    return (
        <>
            <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
                <div className="flex flex-col md:p-12 py-12 px-4">
                    {currentAccount ? (
                        <h3 className="text-white text-3xl text-center my-2">
                            Latest Transactions
                        </h3>
                    ) : (
                        <h3 className="text-white text-3xl text-center my-2">
                            Connect your account to see the latest transactions
                        </h3>
                    )}
                    <div className="flex flex-wrap justify-center items-center mt-10">
                        {transactions.map((transaction, i) => (
                            <TransactionsCard key={i} {...transaction} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Transactions;
