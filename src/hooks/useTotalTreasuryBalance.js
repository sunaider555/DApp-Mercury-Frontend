import { useEffect, useState } from "react"
import Web3 from "web3"
import { web3ProviderFrom } from "../tomb-finance/ether-utils"
import { getBalance } from "../utils/formatBalance"
import axios from 'axios'
import config from './../config';

const web3 = new Web3(config.defaultProvider)

const ERC20ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]
const treasuryAddress = "0x8f555E00ea0FAc871b3Aa70C015915dB094E7f88"

// const ERC20ABI = [{"inputs":[{"internalType":"address","name":"mry","type":"address"},{"internalType":"address","name":"mryOracle","type":"address"},{"internalType":"address","name":"treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Mry","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MryOracle","outputs":[{"internalType":"contract IOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Treasury","outputs":[{"internalType":"contract ITreasury","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WFTM","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"assets","outputs":[{"internalType":"bool","name":"isAdded","type":"bool"},{"internalType":"uint256","name":"multiplier","type":"uint256"},{"internalType":"address","name":"oracle","type":"address"},{"internalType":"bool","name":"isLP","type":"bool"},{"internalType":"address","name":"pair","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"bond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bondFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bondThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bondVesting","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buybackAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claimableMry","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBondPremium","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMryPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getMryReturn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastBuyback","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"redeemAssetsForBuyback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"secondaryFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"secondaryThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"bool","name":"isAdded","type":"bool"},{"internalType":"uint256","name":"multiplier","type":"uint256"},{"internalType":"address","name":"oracle","type":"address"},{"internalType":"bool","name":"isLP","type":"bool"},{"internalType":"address","name":"pair","type":"address"}],"name":"setAsset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"primaryThreshold","type":"uint256"},{"internalType":"uint256","name":"primaryFactor","type":"uint256"},{"internalType":"uint256","name":"secondThreshold","type":"uint256"},{"internalType":"uint256","name":"secondFactor","type":"uint256"},{"internalType":"uint256","name":"vestingPeriod","type":"uint256"}],"name":"setBondParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"mry","type":"address"}],"name":"setMry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"oracle","type":"address"}],"name":"setMryOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalVested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"vesting","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"period","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"},{"internalType":"uint256","name":"claimed","type":"uint256"},{"internalType":"uint256","name":"lastClaimed","type":"uint256"}],"stateMutability":"view","type":"function"}];
// const treasuryAddress = "0xA513BEccbA3a62946c23b9a3Fa16C1e50e8340E0"

// const assetList = [
//     "0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca", // 2shares
//     "0x6398ACBBAB2561553a9e458Ab67dCFbD58944e52", // 2shares/FTM LP
//     "0x83A52eff2E9D112E9B022399A9fD22a9DB7d33Ae", // 3omb/wftm
//     "0x6437ADAC543583C4b31Bf0323A0870430F5CC2e7", // 3shares
//     "0xd352daC95a91AfeFb112DBBB3463ccfA5EC15b65", // 3shares/wftm
// ]

// const contracts = assetList.map(asset => new web3.eth.Contract(ERC20ABI, asset))

// function useTotalTreasuryBalance() {
//     const [ prices, setPrices ] = useState(assetList.map(asset => {
//         return { token: asset, value: 0 }
//     }))
//     useEffect(() => {
//         getPrices()
//     }, [])

//     async function getPrices() {
//         for (const token of contracts) {
//             console.log(token)
//         }
//     }

//     return prices
// }

function useTotalTreasuryBalance() {
    const ThreeShares = new web3.eth.Contract(ERC20ABI, '0x6437ADAC543583C4b31Bf0323A0870430F5CC2e7')
    const WFTM = new web3.eth.Contract(ERC20ABI, '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83')
    const [balance, setBalance] = useState(0)
    const [balance_2shares_wftm, setBalance_2shares_wftm] = useState(0)
    const [balance_3omb_wftm, setBalance_3omb_wftm] = useState(0)
    const [balance_3shares_wftm, setBalance_3shares_wftm] = useState(0)
    const [balance_3omb, setBalance_3omb] = useState(0)
    const [balance_3shares, setBalance_3shares] = useState(0)
    const [balance_2shares, setBalance_2shares] = useState(0)

    useEffect(() => {
        getBalance()
        const interval = setInterval(() => {
            getBalance()
        }, 30000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    return { balance, balance_2shares_wftm, balance_3omb_wftm, balance_3shares_wftm, balance_3omb, balance_3shares, balance_2shares }

    async function getBalance() {
        // const { data2omb } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=2omb-fi')
        // const { data2shares } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=2share')
        // const { data3omb } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=30mb-token')
        
        const { data } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=3shares')
        const threeSharesBalance = web3.utils.fromWei(await ThreeShares.methods.balanceOf(treasuryAddress).call())
        const value3shares = threeSharesBalance * data[0].current_price

        const data2sharesAnd3omb = await axios('https://openapi.debank.com/v1/user/chain_balance?id=0xA513BEccbA3a62946c23b9a3Fa16C1e50e8340E0&chain_id=ftm')

        console.log(`3Shares USD: $${value3shares}`)
        console.log(`2Shares + 3omb: $${data2sharesAnd3omb.data.usd_value}`)
        const LP_2shares_wftm = await getLPPrice('0x6398ACBBAB2561553a9e458Ab67dCFbD58944e52', '0xc54a1684fd1bef1f077a336e6be4bd9a3096a6ca')
        const LP_3omb_wftm = await getLPPrice('0x83A52eff2E9D112E9B022399A9fD22a9DB7d33Ae', '0x14def7584a6c52f470ca4f4b9671056b22f4ffde')
        const LP_3shares_wftm = await getLPPrice('0xd352daC95a91AfeFb112DBBB3463ccfA5EC15b65', '0x6437ADAC543583C4b31Bf0323A0870430F5CC2e7')
        setBalance(data2sharesAnd3omb.data.usd_value + value3shares + LP_2shares_wftm + LP_3omb_wftm + LP_3shares_wftm)
        setBalance_2shares_wftm(LP_2shares_wftm)
        setBalance_3omb_wftm(LP_3omb_wftm)
        setBalance_3shares_wftm(LP_3shares_wftm)
        setBalance_3omb(await get3ombBalance())
        setBalance_3shares(await get3sharesBalance())
        setBalance_2shares(await get2sharesBalance())
    }

    async function get3ombBalance() {
        const token3omb = new web3.eth.Contract(ERC20ABI, '0x14DEf7584A6c52f470Ca4F4b9671056b22f4FfDE')
        const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=USDC&sellToken=0x14DEf7584A6c52f470Ca4F4b9671056b22f4FfDE&sellAmount=100000000000000000`)
        const usdValue = Number(web3.utils.fromWei(await token3omb.methods.balanceOf(treasuryAddress).call())) * Number(data.price)

        return usdValue
    }

    async function get3sharesBalance() {
        const token3shares = new web3.eth.Contract(ERC20ABI, '0x6437ADAC543583C4b31Bf0323A0870430F5CC2e7')
        const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=USDC&sellToken=0x6437ADAC543583C4b31Bf0323A0870430F5CC2e7&sellAmount=100000000000000000`)
        const usdValue = Number(web3.utils.fromWei(await token3shares.methods.balanceOf(treasuryAddress).call())) * Number(data.price)

        return usdValue
    }

    async function get2sharesBalance() {
        const token2shares = new web3.eth.Contract(ERC20ABI, '0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca')
        const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=USDC&sellToken=0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca&sellAmount=100000000000000000`)
        const usdValue = Number(web3.utils.fromWei(await token2shares.methods.balanceOf(treasuryAddress).call())) * Number(data.price)

        return usdValue
    }

    async function getLPPrice(LPAddress, tokenAddress) {
        const token = new web3.eth.Contract(ERC20ABI, tokenAddress)
        const LPtoken = new web3.eth.Contract(ERC20ABI, LPAddress)
        const { data } = await axios('https://api.binance.com/api/v1/ticker/price?symbol=FTMUSDT')
        const wftmValue = Number(web3.utils.fromWei(await WFTM.methods.balanceOf(LPAddress).call())) * Number(data.price)

        const tokenValue = Number(await getTokenPrice(tokenAddress)) * Number(web3.utils.fromWei(await token.methods.balanceOf(LPAddress).call()))

        const OneTokenValue = (wftmValue + tokenValue) / Number(web3.utils.fromWei(await LPtoken.methods.totalSupply().call()))

        const total = OneTokenValue * Number(web3.utils.fromWei(await LPtoken.methods.balanceOf(treasuryAddress).call()))

        console.log(wftmValue)
        console.log(tokenValue)
        console.log(OneTokenValue)
        console.log(total)

        return total
    }

    async function getTokenPrice(tokenAddress) {
        const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=USDC&sellToken=${tokenAddress}&sellAmount=100000000000000000`)
        return data.price
    }
}

export default useTotalTreasuryBalance