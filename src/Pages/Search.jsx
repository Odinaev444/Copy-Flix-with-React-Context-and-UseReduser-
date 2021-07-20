import React, { useEffect } from 'react';
import queryString from 'query-string';

import { searchMovies, useCheckAddedState } from '../Context/actions';
import AppTitleList from '../Components/AppTitleList';

const Search = (props) => {

  const { query } = queryString.parse(props.location.search);
  const [state, setAddedIcon] = useCheckAddedState([]);

  useEffect(() => {
    if (query)
      searchMovies(query).then((shows) => {
        setAddedIcon(shows);
      });

  }, [query])

  useEffect(() => {
    if (state[0] === undefined || state[0].length > 0) {
      setAddedIcon(state);
    };
  }, [state])

  if (state[0] === undefined || state[0].length === 0) return '...';

  return <AppTitleList title="Results" shows={state[0].results} />;
}

export default Search;