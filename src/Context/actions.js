

import React, { useCallback, useState } from 'react';
import { useAppState } from '../Context/index';

const Netflix_ID = 8;
const Crave_ID = 230;
const Disney_ID = 337;
const ApplePlus_ID = 350;

const API_KEY = '';  // set your api key here
const URL = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&watch_region=CA&api_key=${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/tv?watch_region=CA&api_key=${API_KEY}`;
const FULL_DETAILS_URL = `https://api.themoviedb.org/3/tv`;

// -----------------------  Send GET Request to  get All Tv shows  -------------------------------
export async function getTvShows() {

  try {
    let promise1 = fetch(`${URL}&with_watch_providers=${Netflix_ID}`);
    let promise2 = fetch(`${URL}&with_watch_providers=${Crave_ID}`);
    let promise3 = fetch(`${URL}&with_watch_providers=${Disney_ID}`);
    let promise4 = fetch(`${URL}&with_watch_providers=${ApplePlus_ID}`);

    const result = await Promise.all([
      promise1,
      promise2,
      promise3,
      promise4
    ]).then((values) => {
      return values;
    });

    const netflix_data = await result[0].json();
    const crave_data = await result[1].json();
    const disney_data = await result[2].json();
    const apple_data = await result[3].json();

    return [netflix_data, crave_data, disney_data, apple_data];

  } catch (error) {
    console.error(error);
  }
}

// --------  Send GET Request with search query parameters to find movie ---------
export async function searchMovies(search) {

  try {
    let response = await fetch(`${SEARCH_URL}&query=${search}`);
    const result = await response.json();

    return result;

  } catch (error) {
    console.error(error);
  }
}


// --------  Send GET Request with ID to get full details of TV ---------
export async function getFullDetails(id) {

  try {
    let response = await fetch(`${FULL_DETAILS_URL}/${id}?api_key=${API_KEY}`);
    const result = await response.json();

    return result;

  } catch (error) {
    console.error(error);
  }
}


//  ------ set Added  icon state  for movie ------
export function useCheckAddedState() {
  const { watchlist } = useAppState();
  const [state, setState] = useState([])

  const setAddedIcon = useCallback((shows) => {

    if (
      Array.isArray(shows) &&
      watchlist !== undefined &&
      watchlist.length > 0 &&
      shows !== undefined &&
      shows.length > 0
    ) {
      if (shows[0].results === undefined) {
        shows.map((movie, key2) => {
          watchlist.map(list => {
            if (list.id === movie.id) {
              shows[key2].checked = true;
            }
          })
        })
      } else {
        shows.map((data, key1) => {
          data.results.map((movie, key2) => {
            watchlist.map(list => {
              if (list.id === movie.id) {
                data.results[key2].checked = true;
              }
            })
          })
        })

      }

    } else if (
      !Array.isArray(shows) &&
      watchlist !== undefined &&
      watchlist.length > 0
    ) {
      shows.results.map((movie3, ke3) => {
        watchlist.map(list => {
          if (list.id === movie3.id) {
            shows.results[ke3].checked = true;
          }
        })
      })
    }

    setState([...state, shows]);
  }, []);

  return [state, setAddedIcon];
}


