import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
//import CashImage from '../../assets/img/3OMB.svg';
//import CashImage from '../../assets/img/3OMB.svg';
import CashImage from '../../assets/img/mercury.png';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useFantomPrice from '../../hooks/useFantomPrice';
import { tomb as tombTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';

import useTotalTreasuryBalance from '../../hooks/useTotalTreasuryBalance.js';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';

const BackgroundImage = createGlobalStyle`
  body {
    background-color: var(--black);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%231D1E1F' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");
}

* {
    border-radius: 0 !important;
}
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('TOMB-FTM-LP');
  const tShareFtmLpStats = useLpStats('TSHARE-FTM-LP');
  const tShare3ombLpStats = useLpStats('3SHARES-3OMB LP');
  const TwoombTombLpStats = useLpStats('2OMB-TOMB LP');
  const ThreeombTombLpStats = useLpStats('3OMB-TOMB LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  // const tombFinance = useTombFinance();
  const { price: ftmPrice, marketCap: ftmMarketCap, priceChange: ftmPriceChange } = useFantomPrice();
  const { balance: rebatesTVL } = useTotalTreasuryBalance();
  const totalTVL = TVL + rebatesTVL;

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }

  const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tomb.address;
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareFTM_LPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tshare3ombLPStats = useMemo(() => (tShare3ombLpStats ? tShare3ombLpStats : null), [tShare3ombLpStats]);
  const twoombTombLpStats = useMemo(() => (TwoombTombLpStats ? TwoombTombLpStats : null), [TwoombTombLpStats]);
  const threeombTombLpStats = useMemo(() => (ThreeombTombLpStats ? ThreeombTombLpStats : null), [ThreeombTombLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'TOMB-FTM-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'TSHARE-FTM-LP' });

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
    color: var(--accent-light);
  `;

  function currencyFormat(num) {
    return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'TOMB-FTM-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'TSHARE-FTM-LP'}
    />,
  );

  return (
    <Page>
      {/* <BackgroundImage /> */}
      <Grid container spacing={3} justify="space-between">
        {/* Logo */}
        <Grid container item xs={12} sm={3} justify="center">
          {/* <Paper>xs=6 sm=3</Paper> */}
		      <Image className="ombImg-home" color="none" style={{ width: '220px', height: '220px', paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={6}>
          <Paper style={{ backgroundColor: "black !important", boxShadow: "none", border: "1px solid var(--black)" }}>
            <Box p={4} style={{backgroundColor: 'black'}}>
              <h2>Welcome to Mercury Finance</h2>
              <p>The first algorithmic stablecoin on Fantom Opera, pegged to the price of 1 FTM via seigniorage.</p>
              <p>Stake your MERCURY-FTM LP in the Farm to earn XSHARE rewards. Then stake your earned XSHARE in the Boardroom to earn more MERCURY!</p>
              {/* <StyledLink target="_blank" href="https://spookyswap.finance/swap?outputCurrency=0x6437adac543583c4b31bf0323a0870430f5cc2e7">2omb.finance</StyledLink> */}
            </Box>
          </Paper>
				</Grid>
        <Grid container justify="center">
            <Box mt={3} style={{ width: 'inherit', padding: '10px'}}>
            <Alert variant="filled" severity="warning" style={{  backgroundColor: 'purple', color: 'white !important' }}>
              <b style={{ color: 'white' }}>Please visit our <StyledLink target="_blank" href="https://docs.mercury.finance" style = {{color:'black'}}>documentation</StyledLink> before purchasing MERCURY or XSHARE!</b>
            </Alert>
            </Box>
        </Grid>

        {/* <Grid container spacing={3}>
    <Grid item  xs={12} sm={12} justify="center"  style={{ margin: '12px', display: 'flex' }}>
            <Alert severity="warning" style={{ backgroundColor: "transparent", border: "1px solid var(--white)" }}>
              <b>
      Please visit our <StyledLink target="_blank" href="https://docs.tomb.finance">documentation</StyledLink> before purchasing TOMB or TSHARE!</b>
            </Alert>
        </Grid>
        </Grid> */}

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: "black", color: "white", boxShadow: "none", border: "1px solid var(--black)" }} class="override">
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={totalTVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8} >
          <Card class="override" style={{ height: '100%',  color: "white",background: "black", boxShadow: "none", border: "1px solid var(--black)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <CardContent align="center" >
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              {/* <Button color="primary" href="/farms" variant="contained" style={{ marginRight: '10px' }}>
                Farms
              </Button> */}
              <Button  href="/boardroom" variant="outlined" style={{marginRight: "10px", backgroundColor: "#8000ff"}}>
                STAKE NOW
              </Button>
              <Button color="primary" href="/masonry" variant="outlined" style={{ marginRight: '10px', backgroundColor: 'white', color: 'black' }}>
                FARM Now
              </Button>
              <Button href="/cemetery" variant="outlined" style={{ marginRight: '10px', backgroundColor:'#8000ff' }}>
                BUY MERCURY
              </Button>
              <Button href="/cemetery" variant="outlined" style={{ marginRight: '10px' , backgroundColor: 'white', color: 'black'}}>
                BUY XSHARE
              </Button>
              {/* <Button target="_blank" href="https://spookyswap.finance/swap?outputCurrency=0x14def7584a6c52f470ca4f4b9671056b22f4ffde"
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                Buy 3OMB
              </Button>
              <Button variant="contained" target="_blank" href="https://spookyswap.finance/swap?outputCurrency=0x6437adac543583c4b31bf0323a0870430f5cc2e7" style={{ marginRight: '10px' }} className={classes.button}>
                Buy 3SHARES
              </Button>
              <Button variant="contained" target="_blank" href="https://dexscreener.com/fantom/0x83a52eff2e9d112e9b022399a9fd22a9db7d33ae" style={{ marginRight: '10px' }} className={classes.button}>
                3OMB Chart
              </Button>
              <Button variant="contained" target="_blank" href="https://dexscreener.com/fantom/0xd352dac95a91afefb112dbbb3463ccfa5ec15b65" className={classes.button}>
                3SHARES Chart
              </Button> */}
            </CardContent>
          </Card>
        </Grid>

        {/* TOMB */}
        {/* <Grid item xs={12} sm={3}>
          <Card class="override" style={{ backgroundColor: "black", color: "white", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>FTM</h2>
              <Box mt={2} style={{ backgroundColor: "transparent !important" }}>
                <CardIcon style={{ backgroundColor: "transparent !important" }}>
                  <TokenSymbol symbol="wFTM" style={{ backgroundColor: "transparent !important" }} />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>${ftmPrice ? ftmPrice : '-.----'} USD</span>
              </Box>
              <span style={{ fontSize: '14px' }}>
                Market Cap: ${currencyFormat(ftmMarketCap)} <br />
                Price Change 24h: {ftmPriceChange.toFixed(2)}% <br />
                <br />
                <br />
              </span>
            </CardContent>
          </Card>
        </Grid> */}

        {/* TOMB */}
        <Grid item xs={12} sm={4}>
          <Card class="override" style={{ backgroundColor: "black", color: "white", boxShadow: "none", border: "1px solid var(--black)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>MERCURY</h2>
              {/* <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('TOMB');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button> */}
              <Box mt={2} style={{ backgroundColor: "transparent !important" }}>
                <CardIcon style={{ backgroundColor: "transparent !important" }}>
                  <TokenSymbol symbol="MERCURY" style={{ backgroundColor: "transparent !important" }} />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tombPriceInFTM ? tombPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '18px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '14px' }}>
                Market Cap: ${currencyFormat(tombCirculatingSupply * tombPriceInDollars)} <br />
                Circulating Supply: {currencyFormat(tombCirculatingSupply)} <br />
                Total Supply: {currencyFormat(tombTotalSupply)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TSHARE */}
        <Grid item xs={12} sm={4}>
          <Card class="override" style={{ backgroundColor: "black", color: "white", boxShadow: "none", border: "1px solid var(--black)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>XSHARE</h2>
              {/* <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('TSHARE');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button> */}
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="XSHARE" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '18px' }}>${tSharePriceInDollars ? currencyFormat(tSharePriceInDollars) : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '14px' }}>
                Market Cap: ${currencyFormat(tShareCirculatingSupply * tSharePriceInDollars)} <br />
                Circulating Supply: {currencyFormat(tShareCirculatingSupply)} <br />
                Total Supply: {currencyFormat(tShareTotalSupply)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TBOND */}
        <Grid item xs={12} sm={4}>
          <Card class = "override" style={{ backgroundColor: "black", color: "white", boxShadow: "none", border: "1px solid var(--black)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>XBOND</h2>
              {/* <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('TBOND');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button> */}
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="XBOND" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '18px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '14px' }}>
                Market Cap: ${currencyFormat(tBondCirculatingSupply * tBondPriceInDollars)} <br />
                Circulating Supply: {currencyFormat(tBondCirculatingSupply)} <br />
                Total Supply: {currencyFormat(tBondTotalSupply)}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card class="override" style={{ backgroundColor: "black", color: "white", boxShadow: "none", border: "1px solid var(--black)" }}>
            <CardContent align="center">
              <h2>MERCURY-FTM Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="MERCURY_FTM" />
                </CardIcon>
              </Box>
              {/*
              <Box mt={2}>
                <Button color="primary" disabled={true} onClick={onPresentTombZap} variant="contained">
                  Zap In
                </Button>
              </Box>*/}
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} MERCURY /{' '}
                  {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box style={{ fontSize: '18px' }}>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '14px' }}>
                Liquidity: ${tombLPStats?.totalLiquidity ? currencyFormat(tombLPStats.totalLiquidity) : '-.--'} <br />
                Total supply: {tombLPStats?.totalSupply ? currencyFormat(tombLPStats.totalSupply) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card class="override" style={{ backgroundColor: "black", color: "white", boxShadow: "none", border: "1px solid var(--black)" }}>
            <CardContent align="center">
              <h2>XSHARE-FTM Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="XSHARE_FTM" />
                </CardIcon>
              </Box>
              {/*<Box mt={2}>
                <Button color="primary" onClick={onPresentTshareZap} variant="contained">
                  Zap In
                </Button>
            </Box>*/}
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tshareFTM_LPStats?.tokenAmount ? tshareFTM_LPStats?.tokenAmount : '-.--'} XSHARE /{' '}
                  {tshareFTM_LPStats?.ftmAmount ? tshareFTM_LPStats?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box style={{ fontSize: '18px' }}>${tshareFTM_LPStats?.priceOfOne ? tshareFTM_LPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '14px' }}>
                Liquidity: ${tshareFTM_LPStats?.totalLiquidity ? currencyFormat(tshareFTM_LPStats.totalLiquidity) : '-.--'}
                <br />
                Total supply: {tshareFTM_LPStats?.totalSupply ? currencyFormat(tshareFTM_LPStats.totalSupply) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: "black", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center">
              <h2>3SHARES-3OMB Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="3SHARES-3OMB LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tshare3ombLPStats?.tokenAmount ? tshare3ombLPStats?.tokenAmount : '-.--'} 3SHARE /{' '}
                  {tshare3ombLPStats?.ftmAmount ? tshare3ombLPStats?.ftmAmount : '-.--'} 3OMB
                </span>
              </Box>
              <Box style={{ fontSize: '18px' }}>${tshare3ombLPStats?.priceOfOne ? tshare3ombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '14px' }}>
                Liquidity: ${tshare3ombLPStats?.totalLiquidity ? currencyFormat(tshare3ombLPStats.totalLiquidity) : '-.--'}
                <br />
                Total supply: {tshare3ombLPStats?.totalSupply ? currencyFormat(tshare3ombLPStats.totalSupply) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center">
              <h2>3OMB-TOMB Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="3OMB-TOMB LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {threeombTombLpStats?.tokenAmount ? threeombTombLpStats?.tokenAmount : '-.--'} 3OMB /{' '}
                  {threeombTombLpStats?.ftmAmount ? threeombTombLpStats?.ftmAmount : '-.--'} TOMB
                </span>
              </Box>
              <Box style={{ fontSize: '18px' }}>${threeombTombLpStats?.priceOfOne ? threeombTombLpStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '14px' }}>
                Liquidity: ${threeombTombLpStats?.totalLiquidity ? currencyFormat(threeombTombLpStats.totalLiquidity) : '-.--'}
                <br />
                Total supply: {threeombTombLpStats?.totalSupply ? currencyFormat(threeombTombLpStats.totalSupply) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center">
              <h2>2OMB-TOMB Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="2OMB-TOMB LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {twoombTombLpStats?.tokenAmount ? twoombTombLpStats?.tokenAmount : '-.--'} 2OMB /{' '}
                  {twoombTombLpStats?.ftmAmount ? twoombTombLpStats?.ftmAmount : '-.--'} TOMB
                </span>
              </Box>
              <Box style={{ fontSize: '18px' }}>${twoombTombLpStats?.priceOfOne ? twoombTombLpStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '14px' }}>
                Liquidity: ${twoombTombLpStats?.totalLiquidity ? currencyFormat(twoombTombLpStats.totalLiquidity) : '-.--'}
                <br />
                Total supply: {twoombTombLpStats?.totalSupply ? currencyFormat(twoombTombLpStats.totalSupply) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Page>
  );
};

export default Home;
