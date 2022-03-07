import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Image from 'material-ui-image';
import logoImg from '../../assets/img/logo.png';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import styled from "styled-components";


import ListItemLink from '../ListItemLink';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    color: 'var(--white)',
    'background-color': 'black',
    'backdrop-filter': "blur(2px)",
    // borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '0 10px',
    marginBottom: '3rem',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    backgroundColor: 'var(--accent)'
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontFamily: '"Gilroy"',
    fontSize: '30px',
    flexGrow: 1,
  },
  link: {
    textTransform: 'uppercase',
    color: 'var(--white)',
    fontSize: '14px',
    margin: theme.spacing(1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: 'var(--white)',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="sticky" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} >
              {/* <a className={ classes.brandLink } href="/">2omb Finance</a> */}
              <Link to="/" color="inherit" className={classes.brandLink} >
              {/* style={{width:'300px', backgroundImage: `url(${logoImg})` }} */}
              <Image className="ombImg-home" color="none" style={{ width:  window.innerHeight * 0.4 +'px', height:  window.innerHeight * 0.32 * 429/1077 + 'px', paddingTop: '0px' }} src={logoImg} />
       
              </Link>
            </Typography>
            <Box mr={5}>
              <Link color="color" to="/" className={classes.link}>
                HOME
              </Link>
              <Link color="textPrimary" to="/farms" className={classes.link}>
                FARMS
              </Link>
              <Link color="textPrimary" to="/boardroom" className={classes.link}>
                BOARDROOM
              </Link>
              <Link color="textPrimary" to="/bonds" className={classes.link}>
                BOND
              </Link>
              {/* <Link color="textPrimary" to="/rebates" className={classes.link}>
                3DAO
              </Link>
              <Link color="textPrimary" to="/treasury" className={classes.link}>
                Treasury
              </Link> */}
              {/* <Link color="textPrimary" to="/treasury" className={classes.link}>
                Treasury
              </Link>
              <a href="/" target="_blank" className={classes.link}>
                Vaults
              </a> */}
              {/* <Link color="textPrimary" to="/sbs" className={classes.link}>
                SBS
              </Link>
              <Link color="textPrimary" to="/liquidity" className={classes.link}>
                Liquidity
              </Link>
              <Link color="textPrimary" to="/regulations" className={classes.link}>
                Regulations
              </Link> */}
              {/* <a href="https://www.devilfinance.io" target="_blank" className={classes.link}>
                Vaults
              </a> */}
              {/* <a href="https://snapshot.org/#/forgiving.forg.eth" target="_blank" className={classes.link}>
                Governance
              </a> */}
              <a href="https://mercury-finance777.gitbook.io/mercury-finance/" target="_blank" className={classes.link}>
                DOCS
              </a>
              {/* <a href="https://2omb.finance" target="_blank" className={classes.link}>
                2omb
              </a> */}
            </Box>
            <AccountButton text="Connect" />
          </>
        ) : (
          <>
               
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <img  src={logoImg} style={{width: '50% '}} />
            {/* <Typography variant="h6" color="inherit"  className={classes.toolbarTitle}>
              
            </Typography> */}
            
       
            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemLink primary="HOME" to="/" />
                <ListItemLink primary="FARMS" to="/farms" />
                <ListItemLink primary="BOARDROOM" to="/boardroom" />
                <ListItemLink primary="BOND" to="/bonds" />
                {/* <ListItemLink primary="3DAO" to="/rebates" />
                <ListItemLink primary="Treasury" to="/treasury" />
                <ListItemLink primary="Masonry" to="/masonry" />
                <ListItemLink primary="Pit" to="/pit" />
                <ListItemLink primary="SBS" to="/sbs" />
                <ListItemLink primary="Liquidity" to="/liquidity" />
                <ListItemLink primary="Regulations" to="/regulations" />
                <ListItem button component="a" href="https://beluga.fi">
                  <ListItemText>Vaults</ListItemText>
                </ListItem> */}
                {/* <ListItem button component="a" href="https://snapshot.org/#/forgiving.forg.eth">
                  <ListItemText>Governance</ListItemText>
                </ListItem> */}
                <ListItem button component="a" href="https://mercury-finance777.gitbook.io/mercury-finance/">
                  <ListItemText>DOCS</ListItemText>
                </ListItem>
                {/* <ListItem button component="a" href="https://2omb.finance">
                  <ListItemText>2omb</ListItemText>
                </ListItem> */}
                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="Connect" onOpen={handleDrawerClose} />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
