import React, { useState, useEffect } from 'react';
import AddToWatchList from './AddToWatchList';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../Context/index';

function AppMovie({ moveis }) {

  const { watchlist } = useAppState();
  const [storage, setStorage] = useState(watchlist);
  const dispatch = useAppDispatch();

  const onHandleClick = (data) => {
    if (storage !== undefined && storage.length > 0) {
      const copyArr = storage.map(el => el);

      let exist = false;
      copyArr.map((item, key) => {
        if (data.id === item.id) {
          copyArr.splice(key, 1);

          exist = true;
          return;
        }
      })
      if (!exist) {
        copyArr.push(data);

      }
      dispatch({ type: "ADD_LIST", newList: copyArr })

      setStorage([...copyArr])
    } else {
      setStorage([data])
    }

  }


  useEffect(() => {
    if (storage) {
      localStorage.setItem("watchlist", JSON.stringify(storage))
      dispatch({ type: "ADD_LIST", newList: storage })
    }
  }, [storage])

  // if (moveis !== undefined && moveis.length === 0) return '';
  return (
    <>
      {
        moveis.map((data, key) => {
          return (
            <div className="movie" key={key}>
              <Link to={`/details/${data.id}`}>
                {
                  data.poster_path ? <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt="Movie poster" />
                    : <img src={`${process.env.PUBLIC_URL}/image-not-available.jpg`} alt="Movie poster" />
                }
                <div className="overlay">
                  <div className="title">{data.name}</div>
                  <div className="rating">{data.vote_average}/10</div>
                  <div className="plot">
                    {data.overview}
                  </div>
                </div>
              </Link>
              {
                (data && data.checked) ? <AddToWatchList checked={data.checked} onIconClick={() => onHandleClick(data)} />
                  : <AddToWatchList checked={false} onIconClick={() => onHandleClick(data)} />
              }

            </div>
          )
        })
      }
    </>
  );
}

export default AppMovie;