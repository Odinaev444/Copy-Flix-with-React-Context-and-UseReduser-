import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import routes from './Config/routes';
import AppRoute from './Components/AppRoutes';
import { AppProvaider } from "./Context";
import AppHeader from './Components/AppHeader';


const App = () => {
  return (
    <AppProvaider>
      <Router>
        <AppHeader />
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </Router>
    </AppProvaider>
  );
}

export default App;