import React, { useEffect } from 'react';
import AppTitleList from '../Components/AppTitleList';
import { getTvShows, useCheckAddedState } from '../Context/actions';

const Main = (props) => {
  const [state, setAddedIcon] = useCheckAddedState([]);

  useEffect(() => {

    getTvShows().then((shows) => {
      setAddedIcon(shows);
    });

  }, [])

  if (state[0] === undefined || state[0].length === 0) return '...';

  return (
    <>
      <AppTitleList title="Netflix" shows={state[0][0].results} />
      <AppTitleList title="Crave" shows={state[0][1].results} />
      <AppTitleList title="Disney" shows={state[0][2].results} />
      <AppTitleList title="Apple Plus" shows={state[0][3].results} />
    </>
  );
}

export default Main;