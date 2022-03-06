import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';

const CemeteryCard = ({ bank }) => {
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Card variant="outlined" class="override" style={{ backgroundColor: 'black', border: '1px solid var(--black)' }}>
        <CardContent>
          <Box style={{ position: 'relative' }}>
            <Box
              style={{
                position: 'absolute',
                right: '0px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: 'transparent',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TokenSymbol size={32} symbol={bank.depositTokenName} />
            </Box>
            <Typography variant="h5" component="h2">
              {bank.depositTokenName}
            </Typography>
            <Typography style={{color: 'white'}}>
              {/* {bank.name} */}
              Deposit {bank.depositTokenName.toUpperCase()} Earn {` ${bank.earnTokenName}`}
            </Typography>
            {/* <Typography color="textSecondary">
              Multiplier: {bank.multiplier}
            </Typography> */}
          </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
        {/* <Button color="primary" size="small" variant="outlined" target="_blank" href={`${bank.site}`} style={{backgroundColor: '#8000ff', color: 'white'}}>
          ↗
        </Button>
        <Button color="primary" size="small" variant="outlined" target="_blank" href={`${bank.buyLink}`} style={{backgroundColor: '#8000ff', color: 'white'}}>
            Buy
        </Button> */}
        <Button color="primary" size="small" variant="outlined" component={Link} to={`/farms/${bank.contract}`} style={{backgroundColor: '#8000ff', color: 'white'}}>
            Stake
        </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CemeteryCard;
