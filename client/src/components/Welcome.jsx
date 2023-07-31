import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";
import { shortenAddress } from "../utils/shortenAddress";

const commonStyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => {
    return (
        <>
            <input
                placeholder={placeholder}
                name={name}
                type={type}
                step="0.0001"
                value={value}
                onChange={(e) => handleChange(e, name)}
                className="my-2 w-full rounded-sm border-none p-2 outline-none bg-transparent text-white text-sm white-glassmorphism"
            />
        </>
    );
};

const Welcome = () => {
    const {
        connectWallet,
        currentAccount,
        formData,
        isLoading,
        sendTransaction,
        handleChange,
        checkIfWalletIsConnected,
    } = useContext(TransactionContext);

    const handleSubmit = async (e) => {
        const { addressTo, amount, message } = formData;
        e.preventDefault();
        if (!addressTo || !amount || !message) return;
        try {
            if (!window.ethereum) return alert("Please Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length === 0) {
                return alert("No Accounts Found");
            }
        } catch (err) {
            console.log(err);
            throw new Error("No Ethereum Object");
        }
        sendTransaction();
    };

    return (
        <>
            <div className="flex w-full justify-center items-center">
                <div className="flex mf:flex-row flex-col items-start justify-between mf:p-20 py-20 px-4">
                    <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                        <h1 className="text-white text-3xl sm:text-5xl text-gradient py-1">
                            Send Cypto <br />
                            across the World
                        </h1>
                        <p className="text-white text-left mt-5 font-light md:w-9/12 w-11/12 text-base">
                            Explore the cypto world!.. Transfer cryptocurrencies
                            on TRXEM
                        </p>
                        {!currentAccount && (
                            <button
                                type="button"
                                onClick={connectWallet}
                                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] 
                                p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                            >
                                <p className="text-white text-base font-semibold">
                                    Connect to Wallet
                                </p>
                            </button>
                        )}
                        <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                            <div className={`rounded-tl-2xl ${commonStyles}`}>
                                Reliability
                            </div>
                            <div className={commonStyles}>Security</div>
                            <div
                                className={`sm:rounded-tr-2xl ${commonStyles}`}
                            >
                                Reliability
                            </div>
                            <div
                                className={`sm:rounded-bl-2xl ${commonStyles}`}
                            >
                                Web 3.0
                            </div>
                            <div className={commonStyles}>Low Fees</div>
                            <div className={`rounded-br-2xl ${commonStyles}`}>
                                Blockchain
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-start items-center flex-col w-full md:mt-0 mt-10">
                        <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                            <div className="flex justify-between flex-col w-full h-full">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                        <SiEthereum
                                            fontSize={21}
                                            color="#fff"
                                        />
                                    </div>
                                    <BsInfoCircle fontSize={17} color="#fff" />
                                </div>
                                <div>
                                    <p className="text-white font-light text-sm">
                                        {shortenAddress(currentAccount)}
                                    </p>
                                    <p className="text-white font-semibold text-lg mt-1">
                                        Ethereum
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                            <Input
                                placeholder="Address To"
                                name="addressTo"
                                type="text"
                                handleChange={handleChange}
                            />
                            <Input
                                placeholder="Amount (ETH)"
                                name="amount"
                                type="number"
                                handleChange={handleChange}
                            />
                            <Input
                                placeholder="Message"
                                name="message"
                                type="text"
                                handleChange={handleChange}
                            />

                            <div className="h-[1px] w-full bg-gray-400 my-2"></div>
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] cursor-pointer rounded-full"
                                >
                                    Send Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Welcome;
