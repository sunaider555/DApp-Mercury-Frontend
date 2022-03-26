import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

import Label from '../Label';
import Modal, { ModalProps } from '../Modal';
import ModalTitle from '../ModalTitle';
import useTombFinance from '../../hooks/useTombFinance';
import TokenSymbol from '../TokenSymbol';

// import {useMediaQuery} from '@material-ui/core';

// const matches = useMediaQuery('(min-width:900px)');

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const tombFinance = useTombFinance();

  const tombBalance = useTokenBalance(tombFinance.TOMB);
  const displayTombBalance = useMemo(() => getDisplayBalance(tombBalance), [tombBalance]);

  const tshareBalance = useTokenBalance(tombFinance.TSHARE);
  const displayTshareBalance = useMemo(() => getDisplayBalance(tshareBalance), [tshareBalance]);

  const tbondBalance = useTokenBalance(tombFinance.TBOND);
  const displayTbondBalance = useMemo(() => getDisplayBalance(tbondBalance), [tbondBalance]);

  return (
    <Modal>
      <ModalTitle text="My Wallet"/>

      <Balances >
        <StyledBalanceWrapper style = {{paddingBottom: '15px'}} >
          <TokenSymbol symbol="MERCURY" />
          <StyledBalance>
            <StyledValue>{displayTombBalance}</StyledValue>
            <Label text="MERCURY Available" variant="primary" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style = {{paddingBottom: '15px'}}>
          <TokenSymbol symbol="XSHARE" />
          <StyledBalance>
            <StyledValue>{displayTshareBalance}</StyledValue>
            <Label text="XSHARE Available" variant="primary" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style = {{paddingBottom: '15px'}}>
          <TokenSymbol symbol="XBOND" />
          <StyledBalance>
            <StyledValue>{displayTbondBalance}</StyledValue>
            <Label text="XBOND Available" variant="primary" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
