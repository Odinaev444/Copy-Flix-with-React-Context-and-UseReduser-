import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getFullDetails } from '../Context/actions';
import { useAppState, useAppDispatch } from '../Context/index';


const Details = (props) => {

  const { watchlist } = useAppState();
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [state, setState] = useState(false)
  const [storage, setStorage] = useState(watchlist);
  const dispatch = useAppDispatch();
  let exist = false;
  const onHandleClick = (data) => {
    if (storage !== undefined && storage.length > 0) {
      const copyArr = storage.map(el => el);

      //let exist = false;
      copyArr.map((item, key) => {
        if (data.id === item.id) {
          copyArr.splice(key, 1);
          // data.checked = true;
          setState(false);
          return;
        }
      })
      if (!state) {
        copyArr.push(data);
        setState(true);
        // data.checked = false;
      }

      dispatch({ type: "ADD_LIST", newList: copyArr })

      setStorage([...copyArr])
    } else {

      setStorage([data])
    }
  }

  useEffect(() => {
    if (id && watchlist !== undefined)
      getFullDetails(id).then((data) => {

        watchlist.map(element => {

          if (element.id === data.id) {
            data.checked = true;
            setState(true);
          }
        })
        setDetails(data)
      });

  }, [id])



  useEffect(() => {
    if (storage) {
      localStorage.setItem("watchlist", JSON.stringify(storage))
    }
  }, [storage])

  return (
    <div className="show-details">
      <img src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} alt="" />
      <div className="show-details-inner">
        <h1>{details.name}</h1>
        <div className="description">{details.overview}</div>
        {console.log(state)}
        {
          (state) ? <button onClick={() => onHandleClick(details)} className="remove-to-watchlist ">- Remove from watch list</button>
            : <button onClick={() => onHandleClick(details)} className="add-to-watchlist ">+ Add to watch list</button>
        }

      </div>
    </div>
  );
}

export default Details;