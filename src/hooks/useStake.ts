import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import { Bank } from '../tomb-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useStake = (bank: Bank) => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      console.log("BB_cemetry_amount_string", amount);
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      console.log("BB_cemetry_amount_parsed", amountBn);
      handleTransactionReceipt(
        tombFinance.stake(bank.contract, bank.poolId, amountBn),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank, tombFinance, handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStake;
