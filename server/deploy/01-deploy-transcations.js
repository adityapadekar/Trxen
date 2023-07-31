require("dotenv").config();
const { verify } = require("../utils/verify");
const { network } = require("hardhat");

const developmentChains = ["hardhat", "localhost"];

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("\n=================================================================");
    log("Deploying Contract........\n");

    const transactions = await deploy("Transactions", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log("\nContract Deployed!...");
    log("=================================================================\n");
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(transactions.address, []);
    }
    log("=================================================================");
};
