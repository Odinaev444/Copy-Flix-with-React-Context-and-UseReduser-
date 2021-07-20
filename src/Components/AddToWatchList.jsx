import React, { useState } from 'react';

function AddToWatchList({ checked, onIconClick }) {
  const [state, setState] = useState(checked)
  const onHandleClick = (e) => {
    setState((old) => !old)
    onIconClick();

  }
  return (
    <div data-toggled={state} className="listToggle" onClick={onHandleClick}>
      <div><i className="fa fa-fw fa-plus"></i><i className="fa fa-fw fa-check"></i></div>
    </div>
  );
}

export default AddToWatchList;