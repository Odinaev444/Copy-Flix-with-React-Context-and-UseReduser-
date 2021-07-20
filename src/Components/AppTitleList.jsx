import React from 'react';

import AppMovie from './AppMovie';

const AppTitleList = ({ title, shows }) => {

  return (
    <div className="titleList">
      <div className="title">
        <h1>{title} </h1>
        <div className="titles-wrapper">
          <AppMovie moveis={shows} />
        </div>
      </div>
    </div>
  );
}

export default AppTitleList;