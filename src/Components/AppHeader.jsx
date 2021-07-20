import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';


const AppHeader = (props) => {
  const [search, setSearch] = useState('');
  const history = useHistory();

  const onFormSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?query=${search}`)
  }

  return (
    <header className="header">
      <Link to={{
        pathname: "/",
        search: "",
      }}>
        <img src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
          alt="netflix-font" border="0" />
      </Link>
      <div id="navigation" className="navigation">
        <nav>
          <ul>
            <li>
              <Link to={{
                pathname: "/my-watch-list",
                search: "",
              }}>Watch List</Link></li>
          </ul>
        </nav>
      </div>
      <form id="search" className="search" onSubmit={onFormSubmit}>
        <input
          type="search"
          placeholder="Search for a title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="searchResults"></div>
      </form>
    </header>
  );
}

export default AppHeader;