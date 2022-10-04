const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
const dotenv = require("dotenv");

dotenv.config();


const getLive = async (req, res, next) => {
    res.status(200).json(
        "API for Getting minimum time to remove all cars containing illegal goods",
    );
};

const postMinimalTime = async (req, res, next) => {
    try {
        const string = req.body.string.toString();
        let length = string.length;
		let left = 0;
		let result = length;

        for (let i = 0; i < length; i++) {
            left = Math.min(
                left + (parseInt(string.slice(i, i + 1)) - 0) * 2,
                i + 1,
			);
			result = Math.min(result, left + length - i - 1);
		}
		console.log("Output: ", result);
		res.status(200).json({result: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
};

// const postRewardsMatic = async (req, res, next) => {
//     try {
//         let amount;
//         // console.log('Rewards Account: ', rewards);
//         const web3 = new Web3(
//             new Web3.providers.HttpProvider(
//                 `${INFURA_MUMBAI_URL}${INFURA_KEY}`,
//             ),
//         );
//         web3.eth.accounts.wallet.add({
//             privateKey: PVT_KEY_REWARDS,
//             address: rewards,
//         });
//         web3.eth.defaultAccount = rewards;
//         const wallet = req.body.wallet.toString();
//         const amountInt = parseInt(req.body.amount, 10);
//         const type = req.body.type.toString();
//         // console.log('Wallet: ', wallet);
//         // console.log('Amount: ', amountInt);
//         // console.log('Type: ', type);
//         const gasMaticFee = MaticFee;
//         // console.log('Gas Matic Fee: ', gasMaticFee);
//         if (amountInt >= gasMaticFee) {
//             const sub = amountInt - gasMaticFee;
//             amount = web3.utils.toWei(sub.toString(), "ether");
//         } else {
//             res.status(500).json({
//                 error: "OAI Amount is not enough for cover the transfer",
//             });
//         }
//         const gasPrice = await web3.eth.getGasPrice().then((gas) => {
//             return gas / 1e9;
//         });
//         const contract = new web3.eth.Contract(abi, OAI_MATIC_Test);
//         // console.log('Wallet: ', wallet);
//         // console.log('Amount: ', JSON.parse+(amount));
//         // console.log('Type: ', type);
//         // console.log('Balance of Rewards Wallet: ', await contract.methods.balanceOf(rewards).call());
//         const gas = await contract.methods
//             .transfer(wallet, amount)
//             .estimateGas({})
//             .then(async (gas) => {
//                 // console.log('Gas Estimate MATIC for the OAI Reward Transfer: ', gas, gasPrice, GAS_USED);
//                 await contract.methods
//                     .transfer(wallet, amount)
//                     .send({
//                         from: rewards,
//                         gas: GAS_USED,
//                         gasPrice: 15000000000,
//                     })
//                     .on("transactionHash", (hash) => {
//                         console.log("Transaction Hash: ", hash);
//                     })
//                     .on("confirmation", (confirmationNumber, receipt) => {
//                         if (confirmationNumber == 0) {
//                             console.log(
//                                 "Transaction Confirmed, waiting for 3th confirmations",
//                             );
//                         } else if (confirmationNumber == 3) {
//                             console.log("Transaction with 3th Confirmations");
//                             res.status(200).json({
//                                 message: "Transaction with 3th Confirmations",
//                                 transactionHash: receipt.transactionHash,
//                                 type: type.toString(),
//                                 oaiFee: gasMaticFee,
//                                 rewards: web3.utils.fromWei(amount, "ether"),
//                             });
//                         }
//                     });
//             });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.toString() });
//     }
// };

const get404 = (req, res, next) => {
    res.status(500).json({ status: "error", messages: "Route Not Found" });
};

module.exports = {
    getTest: getLive,
    postMinimalTime: postMinimalTime,
    get404: get404,
};
