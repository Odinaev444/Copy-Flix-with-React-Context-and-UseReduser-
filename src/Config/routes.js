import Main from '../Pages/Main';
import MyWatchList from '../Pages/MyWatchList';
import Details from '../Pages/Details';
import Search from '../Pages/Search';

const routes = [
  {
    path: '/',
    exact: true,
    component: Main
  },
  {
    path: '/my-watch-list',
    component: MyWatchList
  },
  {
    exact: true,
    path: '/details/:id',
    component: Details
  },
  {
    path: '/search',
    component: Search
  },
]

export default routes;