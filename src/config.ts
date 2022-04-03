// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@spookyswap/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  production: {
    chainId: ChainId.MAINNET,
    //chainId: ChainId.FTMTESTNET,
    // networkName: 'Fantom Opera',
    networkName: 'Fantom Opera Mainnet',
    ftmscanUrl: 'https://ftmscan.com',
    // ftmscanUrl: 'https://rpc.testnet.fantom.network',
    defaultProvider: 'https://rpc.ftm.tools/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', 18],
      //WFTM: ['0xf1277d1ed8ad466beddf92ef448a132661956621', 18],
      USDC: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6],
      BOO: ['0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE', 18],
      ZOO: ['0x09e145a1d53c0045f41aeef25d8ff982ae74dd56', 0],
      SHIBA: ['0x9ba3e4f84a34df4e08c112e1a0ff148b81655615', 9],
      BELUGA: ['0x4A13a2cf881f5378DEF61E430139Ed26d843Df9A', 18],
      BIFI: ['0xd6070ae98b8069de6B494332d1A1a81B6179D960', 18],
      MIM: ['0x82f0b8b456c1a451378467398982d4834b6829c1', 18],
      BLOOM: ['0x9B2e37cDC711CfcAC1E1482B5741c74dd3924199', 9],
      'wFTM': ['0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', 18],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      
      'MERCURY': ['0x7A8e1267DBB4f5f78D1a795e38604A8E37A28DF5', 18],
      'XSHARE': ['0x5a1c848382a734b39F54bFC6a376cF581030ccD5', 18],
      'MERCURY-FTM LP': ['0xe5764bDF2A8E073D19f22E4bEA276b878F9b5445', 18],
      'XSHARE-FTM LP': ['0x00AAFC9556BB469d2812b66c9763Ee59553f74CD', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding TOMB
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  FtmMryRewardPool: {
    name: 'Earn MERCURY by staking FTM',
    poolId: 0,
    sectionInUI: 22,
    contract: 'FtmMryRewardPool',
    depositTokenName: 'WFTM',
    earnTokenName: 'MERCURY',
    finished: false,
    multiplier: '35500x',
    site: "http://mercuryfinance.io",
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0xf978055dA371a8D592AF5930BA387CE1836344C9',
    sort: 2,
    closedForStaking: false,
  },
  UsdcMryRewardPool: {
    name: 'Earn MERCURY by staking USDC',
    poolId: 0,
    sectionInUI: 22,
    contract: 'UsdcMryRewardPool',
    depositTokenName: 'USDC',
    earnTokenName: 'MERCURY',
    finished: false,
    multiplier: '35500x',
    site: "http://mercuryfinance.io",
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0xf978055dA371a8D592AF5930BA387CE1836344C9',
    sort: 3,
    closedForStaking: false,
  },
  MryFtmLpShareRewardPool: {
    name: 'Earn XSHARE by staking MERCURY-FTM LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'MryFtmLpShareRewardPool',
    depositTokenName: 'MERCURY-FTM LP',
    earnTokenName: 'XSHARE',
    finished: false,
    multiplier: '35500x',
    site: "http://mercuryfinance.io",
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0xf978055dA371a8D592AF5930BA387CE1836344C9',
    sort: 0,
    closedForStaking: false,
  },
  ShareFtmLpShareRewardPool: {
    name: 'Earn XSHARE by staking XSHARE-FTM LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'ShareFtmLpShareRewardPool',
    depositTokenName: 'XSHARE-FTM LP',
    earnTokenName: 'XSHARE',
    finished: false,
    multiplier: '35500x',
    site: "http://mercuryfinance.io",
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0xf978055dA371a8D592AF5930BA387CE1836344C9',
    sort: 1,
    closedForStaking: false,
  }
  // ,
  // ShareMryRewardPool: {
  //   name: 'Earn 3SHARES by 2SHARES-WFTM LP',
  //   poolId: 0,
  //   sectionInUI: 3,
  //   contract: 'ShareMryRewardPool',
  //   depositTokenName: 'XSHARE',
  //   earnTokenName: 'MERCURY',
  //   finished: false,
  //   multiplier: '15000x',
  //   buyLink: 'https://spookyswap.finance/add/FTM/0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca',
  //   site: 'https://mercury.finance',
  //   sort: 0,
  //   closedForStaking: false,
  // },
  // TwoshareFtmLPTShareRewardPool: {
  //   name: 'Earn 3SHARES by 2SHARES-WFTM LP',
  //   poolId: 0,
  //   sectionInUI: 22,
  //   contract: 'TwoshareFtmLPTShareRewardPool',
  //   depositTokenName: 'WFTM',
  //   earnTokenName: 'MERCURY',
  //   finished: false,
  //   multiplier: '15000x',
  //   buyLink: 'https://spookyswap.finance/add/FTM/0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca',
  //   site: 'https://mercury.finance',
  //   sort: 3,
  //   closedForStaking: false,
  // },
  // TwoombFtmLPTShareRewardPool: {
  //   name: 'Earn 3SHARES by 2OMB-WFTM LP',
  //   poolId:0,
  //   sectionInUI: 22,
  //   contract: 'TwoombFtmLPTShareRewardPool',
  //   depositTokenName: 'USDC',
  //   earnTokenName: 'MERCURY',
  //   finished: false,
  //   multiplier: '35500x',
  //   buyLink: 'https://spookyswap.finance/add/FTM/0x7a6e4e3cc2ac9924605dca4ba31d1831c84b44ae',
  //   site: 'https://mercury.finance',
  //   sort: 4,
  //   closedForStaking: false,
  // }
};

export default configurations['production'];
