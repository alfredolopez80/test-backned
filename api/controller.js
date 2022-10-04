const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const dotenv = require('dotenv');
const Web3 = require('web3');
const { BigNumber, ethers } = require('ethers');
const { abi } = require('../abi/OmniTokenV4.json');

dotenv.config();

let MaticFee;
let BnbFee;
const GAS_USED = parseInt(50000) // Gas Used for the OAI Transaction
const OAI = process.env.OAI_ADDRESS;
const OAI_BNB_Test = process.env.OAI_BNB_TEST;
const OAI_MATIC_Test = process.env.OAI_MATIC_TEST;
const PVT_KEY_REWARDS = process.env.PRIVATE_KEY_REWARDS;
const BASE_URL = process.env.MORALIS_BASE_URL;
const INFURA_POLYGON_URL = process.env.INFURA_POLYGON_URL;
const INFURA_MUMBAI_URL = process.env.INFURA_MUMBAI_URL;
const rewards = process.env.ACCOUNTS_REWARDS;
const BNB_URL = process.env.BSC_MAINNET;
const options = {
	method: "GET",
	headers: {
		Accept: "application/json",
		'X-API-Key': process.env.MORALIS_API_KEY
	},
	mode: 'cors',
	cache: 'default'
};
const URL_BNB = `${BASE_URL}${OAI}/price?chain=bsc`
const URL_MATIC = `${BASE_URL}${OAI}/price?chain=polygon`
const INFURA_KEY = process.env.INFURA_KEY;

const getLive = async (req, res, next) => {
	res.status(200)
		.json('API Ratio OAI/BNB and OAI/MATIC is Live');
}

const getPrice = async (url, req, res, next) => {
	try {
		return fetch(url, options)
			.then(res => res.json())
			.then(data => {
				return data.nativePrice.value / 1e18;
			});
	} catch (err) {
		console.error(err);
		res.status(500)
			.json({ error: err.toString() });
	}
}

const getBnb = async (req, res, next) => {
	try {
		fetch(URL_BNB, options)
			.then(res => res.json())
			.then(data => {
				res.status(200).json(data.nativePrice.value / 1e18);
			});
	} catch (err) {
		console.error(err);
		res.status(500)
			.json({ error: err.toString() });
	}

}

const getMatic = async (req, res, next) => {
	try {
		fetch(URL_MATIC, options)
			.then(res => res.json())
			.then(data => {
				res.status(200).json(data);
			});
	} catch (err) {
		console.error(err);
		res.status(500)
			.json({ error: err.toString() });
	}
}

const getUsdBnb = async (req, res, next) => {
	try {
		fetch(URL_BNB, options)
			.then(res => res.json())
			.then(data => {
				res.status(200).json(data.usdPrice);
			});
	} catch (err) {
		console.error(err);
		res.status(500)
			.json({ error: err.toString() });
	}
}

const getUsdMatic = async (req, res, next) => {
	try {
		fetch(URL_MATIC, options)
			.then(res => res.json())
			.then(data => {
				res.status(200).json(data.usdPrice);
			});
	} catch (err) {
		console.error(err);
		res.status(500)
			.json({ error: err.toString() });
	}
}

const getMaticFee = async (req, res, next) => {
	try {
		const web3 = new Web3(new Web3.providers.HttpProvider(`${INFURA_POLYGON_URL}${INFURA_KEY}`));
		const gasUsed = GAS_USED
		const MaticPrice = await getPrice(URL_MATIC, req, res, next);
		await web3.eth.getGasPrice().then((gas) => {
			const gasPrice = gas / 1e9;
			// console.log('Gas Price Receive in the Web3 Call back function / Polygon Chain: ', gasPrice);
			// console.log('Matic Price Receive of Moralis Web API: ', MaticPrice);
			//include 5% Additional of Dust in the OAI fee
			const oaiFee = (gasUsed * MaticPrice * gasPrice) / 0.95;
			MaticFee = oaiFee;
			res.status(200).json(oaiFee);
		})
	} catch (err) {
		console.error(err);
		res.status(500)
			.json({ error: err.toString() });
	}
}

const getBnbFee = async (req, res, next) => {
	try {
		const web3 = new Web3(new Web3.providers.HttpProvider(`${BNB_URL}`));
		const gasUsed = GAS_USED
		const BnbPrice = await getPrice(URL_BNB, req, res, next);
		await web3.eth.getGasPrice().then((gas) => {
			const gasPrice = gas / 1e9;
			console.log('Gas Price Receive in the Web3 Call back function / Binance Smart Chain: ', gasPrice);
			console.log('BNB Price Receive of Moralis Web API: ', BnbPrice);
			//include 5% Additional of Dust in the OAI fee
			const oaiFee = (gasUsed * BnbPrice * gasPrice) / 0.95;
			BnbFee = oaiFee;
			res.status(200).json(oaiFee);
		})
	} catch (err) {
		console.error(err);
		res.status(500)
			.json({ error: err.toString() });
	}
}

const postRewardsMatic = async (req, res, next) => {
	try {
		let amount;
		// console.log('Rewards Account: ', rewards);
		const web3 = new Web3(new Web3.providers.HttpProvider(`${INFURA_MUMBAI_URL}${INFURA_KEY}`));
		web3.eth.accounts.wallet.add({
			privateKey: PVT_KEY_REWARDS,
			address: rewards
		});
		web3.eth.defaultAccount = rewards;
		const wallet = (req.body.wallet).toString();
		const amountInt = parseInt(req.body.amount, 10);
		const type = (req.body.type).toString();
		// console.log('Wallet: ', wallet);
		// console.log('Amount: ', amountInt);
		// console.log('Type: ', type);
		const gasMaticFee = MaticFee;
		// console.log('Gas Matic Fee: ', gasMaticFee);
		if (amountInt >= gasMaticFee) {
			const sub = amountInt - gasMaticFee;
			amount = web3.utils.toWei(sub.toString(), 'ether');
		} else {
			res.status(500)
				.json({ error: 'OAI Amount is not enough for cover the transfer' });
		}
		const gasPrice = await web3.eth.getGasPrice().then((gas) => { return gas / 1e9; });
		const contract = new web3.eth.Contract(abi, OAI_MATIC_Test);
		// console.log('Wallet: ', wallet);
		// console.log('Amount: ', JSON.parse+(amount));
		// console.log('Type: ', type);
		// console.log('Balance of Rewards Wallet: ', await contract.methods.balanceOf(rewards).call());
		const gas = await contract.methods.transfer(wallet, amount).estimateGas({}).then(async (gas) => {
			// console.log('Gas Estimate MATIC for the OAI Reward Transfer: ', gas, gasPrice, GAS_USED);
			await contract.methods.transfer(wallet, amount).send({ from: rewards, gas: GAS_USED, gasPrice: 15000000000 })
				.on('transactionHash', (hash) => {
					console.log('Transaction Hash: ', hash);
				}
				).on('confirmation', (confirmationNumber, receipt) => {
					if (confirmationNumber == 0) {
						console.log('Transaction Confirmed, waiting for 3th confirmations');
					} else if (confirmationNumber == 3) {
						console.log('Transaction with 3th Confirmations');
						res.status(200).json({
							message: 'Transaction with 3th Confirmations',
							transactionHash: receipt.transactionHash,
							type: type.toString(),
							oaiFee: gasMaticFee,
							rewards: web3.utils.fromWei(amount, 'ether')
						});
					}
				});
		});
	} catch (err) {
		console.error(err);
		res.status(500)
			.json({ error: err.toString() });
	}
}

const get404 = (req, res, next) => {
	res.status(500).json({ status: 'error', messages: 'Route Not Found' });
}

module.exports = {
	getTest: getLive,
	getBnb: getBnb,
	getMatic: getMatic,
	getUsdBnb: getUsdBnb,
	getUsdMatic: getUsdMatic,
	getMaticFee: getMaticFee,
	getBnbFee: getBnbFee,
	postRewardsMatic: postRewardsMatic,
	get404: get404
};
