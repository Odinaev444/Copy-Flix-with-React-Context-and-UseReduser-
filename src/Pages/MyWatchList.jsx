import React, { useEffect } from 'react';

import AppTitleList from '../Components/AppTitleList';
import { useAppState } from '../Context/index';
import { useCheckAddedState } from '../Context/actions';

const WatchList = (props) => {

  const { watchlist } = useAppState();
  const [state, setAddedIcon] = useCheckAddedState();

  useEffect(() => {
    if (watchlist) {
      setAddedIcon(watchlist);
    }
    console.log(watchlist)
  }, [watchlist])

  if (state[0] === undefined || state[0].length === 0) return '...';

  return (
    <>
      <AppTitleList title="WathcList" shows={state[0]} />
    </>
  );
}

export default WatchList;