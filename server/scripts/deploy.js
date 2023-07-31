const { ethers } = require("hardhat");

const main = async () => {
    const transactionsFactory = await ethers.getContractFactory("Transactions");
    console.log("Deploying ...");
    const transactionsContract = await transactionsFactory.deploy();
    await transactionsContract.deployed();

    console.log(`Deployed to ${transactionsContract.getAddress}`);
};

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
