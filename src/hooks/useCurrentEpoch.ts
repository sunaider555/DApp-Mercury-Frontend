import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { BigNumber } from 'ethers';
import useRefresh from './useRefresh';

const useCurrentEpoch = () => {
  const [currentEpoch, setCurrentEpoch] = useState<BigNumber>(BigNumber.from(0));
  const tombFinance = useTombFinance();
  const { slowRefresh } = useRefresh(); 

  useEffect(() => {
    async function fetchCurrentEpoch () {
      try {
        setCurrentEpoch(await tombFinance.getCurrentEpoch());
        console.log("BB_>>>");
      } catch(err) {
        console.error(err);
      }
    }
    fetchCurrentEpoch();
  }, [setCurrentEpoch, tombFinance, slowRefresh]);
  console.log("bb_useCurrentEpoch.ts", currentEpoch);
  return currentEpoch;
};

export default useCurrentEpoch;
