import React from 'react';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/3OMB.svg';
import tShareLogo from '../../assets/img/3SHARES.svg';
import tombLogoPNG from '../../assets/img/3OMB.png';
import tShareLogoPNG from '../../assets/img/3SHARES.png';
import tBondLogo from '../../assets/img/3BOND-01.png';

import tombFtmLpLogo from '../../assets/img/tomb_ftm_lp.png';
import tshareFtmLpLogo from '../../assets/img/tshare_ftm_lp.png';

import wftmLogo from '../../assets/img/fantom-ftm-logo.png';
import booLogo from '../../assets/img/spooky.png';
import belugaLogo from '../../assets/img/BELUGA.png';
import twoshareLogo from '../../assets/img/t_2SHARE-01.png';
import twoombLogo from '../../assets/img/t_2OMB-01.png';
import zooLogo from '../../assets/img/zoo_logo.svg';
import shibaLogo from '../../assets/img/shiba_logo.svg';
import bifiLogo from '../../assets/img/COW.svg';
import mimLogo from '../../assets/img/mimlogopng.png';
import bloomLogo from '../../assets/img/BLOOM.jpg';
import TwoombLPLogo from '../../assets/img/2OMB-WFTM.png';
import TwosharesLPLogo from '../../assets/img/2SHARES-WFTM.png';
import TwoombTwosharesLPLogo from '../../assets/img/2OMB-2SHARES.png';

import usdcLogo from '../../assets/img/USDC.png';

import ThreeombLPLogo from '../../assets/img/3OMB-WFTM.png';
import ThreesharesLPLogo from '../../assets/img/3SHARES-WFTM.png';
import ThreesharesThreeombLPLogo from '../../assets/img/3SHARES-3OMB.png';
import ThreeombTombLPLogo from '../../assets/img/3OMB-TOMB.png';
import TwoombTombLPLogo from '../../assets/img/2OMB-TOMB.png';

import mercuryLogo from '../../assets/img/mercury.png';
import xshareLogo from '../../assets/img/xshare.png';
import xbondLogo from '../../assets/img/xbond.png';
import mercury_ftmLogo from '../../assets/img/mercury.png';
import xshare_ftmLogo from '../../assets/img/mercury.png';
const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  TOMB: tombLogo,
  TOMBPNG: tombLogoPNG,
  TSHAREPNG: tShareLogoPNG,
  TSHARE: tShareLogo,
  TBOND: tBondLogo,

  BOO: booLogo,
  SHIBA: shibaLogo,
  ZOO: zooLogo,
  BELUGA: belugaLogo,
  BIFI: bifiLogo,
  MIM: mimLogo,
 
  BLOOM: bloomLogo,
  MERCURY: mercuryLogo, //bb...
  'MERCURY-FTM LP': mercuryLogo,
  XSHARE: xshareLogo,
  'XSHARE-FTM LP': xshareLogo,
  XBOND: xbondLogo,
  MERCURY_FTM: mercury_ftmLogo,   
  XSHARE_FTM: xshare_ftmLogo,
  'MERCURY-WFTM-LP': mercury_ftmLogo,
  'XSHARE-FTM-LP': xshare_ftmLogo,
  'WFTM': wftmLogo,
  'USDC': usdcLogo,
  '2OMB': xbondLogo,
  'ETH' : xbondLogo,

  '2OMB-WFTM LP': TwoombLPLogo,
  '2SHARES-WFTM LP': TwosharesLPLogo,
  '2OMB-2SHARES LP': TwoombTwosharesLPLogo,

  '3OMB-WFTM LP': ThreeombLPLogo,
  '3SHARES-WFTM LP': ThreesharesLPLogo,
  '3SHARES-3OMB LP': ThreesharesThreeombLPLogo,

  '3OMB-TOMB LP': ThreeombTombLPLogo,
  '2OMB-TOMB LP': TwoombTombLPLogo,

  'wFTM': wftmLogo,
  // '2OMB': twoombLogo,
  '2SHARES': twoshareLogo,
  'TOMB-FTM-LP': tombFtmLpLogo,
  'TSHARE-FTM-LP': tshareFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    return <img src={logosBySymbol['TOMB']} alt={`${symbol} Logo`} width={size} height={size} />
    // throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
