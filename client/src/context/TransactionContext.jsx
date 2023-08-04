import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

const { ethereum } = window;

export const TransactionContext = React.createContext();

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    // console.log({
    //     provider,
    //     signer,
    //     transactionContract,
    // });

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [connected, setConnected] = useState(false);
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem("transactionCount")
    );
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => {
            return { ...prevState, [name]: e.target.value };
        });
    };

    const getAllTransaction = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask");
            const transactionContract = getEthereumContract();
            const availableTransactions =
                await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map(
                (transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(
                        transaction.timestamp.toNumber() * 1000
                    ).toLocaleString(),
                    message: transaction.message,
                    amount: parseInt(transaction.amount._hex) / 10 ** 18,
                })
            );
            setTransactions(structuredTransactions);
        } catch (err) {
            console.log(err);
            throw new Error("No Ethereum Object");
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask");

            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                // setConnected(true);
            } else {
                console.log("No Accounts Found");
            }

            // if (!window.ethereum) return alert("Please Install Metamask");

            // const accounts = await window.ethereum.request({
            //     method: "eth_accounts",
            // });
            // if (accounts.length === 0) {
            //     console.log("No Accounts Found");
            // } else {
            //     setConnected(true);
            // }
            console.log(accounts);
            getAllTransaction();
        } catch (err) {
            console.log(err);
            throw new Error("No Ethereum Object");
        }
    };

    const checkIfTransactionExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount =
                await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (err) {
            console.log(err);
            throw new Error("No Ethereum Object");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
        // chearWindow();
    }, [transactionCount,currentAccount]);

    const clearWindow = () => {
        // setConnected(false);
        // window.location.reload();
        setCurrentAccount("")
    };
    const reloadOnDisconnect = () => {
        // setConnected(false);
        // window.location.reload();
        // clearWindow();
        setCurrentAccount("")
    };

    const reloadOnChainChange = () => {
        // setConnected(false);
        // window.location.reload();
        // clearWindow();
        

    };

    ethereum.on("accountsChanged", clearWindow);
    ethereum.on("networkChanged", clearWindow);

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask");

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
            // setConnected(true);
            // window.location.reload();
        } catch (err) {
            console.log(err);
            throw new Error("No Ethereum Object");
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask");
            console.log("Metamask Present");
            const { addressTo, amount, message } = formData;
            console.log({ addressTo, amount, message });
            const transactionContract = getEthereumContract();
            console.log("Contract recieved");
            const amountToHex = ethers.utils.parseEther(amount);

            console.log("sending transaction");
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: amountToHex._hex,
                    },
                ],
            });

            console.log("transaction sent");

            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                amountToHex,
                message
            );

            setIsLoading(true);
            console.log(`Loading - ${transactionHash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash}`);
            setIsLoading(false);

            const transactionCount =
                await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());
            window.location.reload();
        } catch (err) {
            console.log(err);
            throw new Error("No Ethereum Object");
        }
    };

    return (
        <TransactionContext.Provider
            value={{
                formData,
                handleChange,
                sendTransaction,
                isLoading,
                currentAccount,
                connectWallet,
                transactionCount,
                transactions,
                checkIfWalletIsConnected,
                connected,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
