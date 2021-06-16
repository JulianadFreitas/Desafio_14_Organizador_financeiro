import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import UserContext, { UserProvider } from '../contexts/UserContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AddRevenue from '../pages/AddRevenue';
import AddExpense from '../pages/AddExpense';
import GlobalStyle from '../components/GlobalStyle';
import config from '../config';

export default function App () {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <Router>
          <Switch>
            <UnprotectedRoute path="/login" exact>
              <Login />
            </UnprotectedRoute>

            <UnprotectedRoute path="/sign-up" exact>
              <SignUp />
            </UnprotectedRoute>

            <ProtectedRoute path="/">
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>

                <Route path="/add-revenue" exact>
                  <AddRevenue />
                </Route>

                <Route path="/add-expense" exact>
                  <AddExpense />
                </Route>
              </Switch>
            </ProtectedRoute>
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
}

function UnprotectedRoute ({ path, exact = false, children }) {
  const { userData } = useContext(UserContext);

  return (
    !userData.token && config.useAuthentication
      ? <Route path={path} exact={exact}>{ children }</Route>
      : <Redirect to={{ pathname: '/' }}></Redirect>
  );
}

function ProtectedRoute ({ path, exact = false, children }) {
  const { userData } = useContext(UserContext);

  return (
    userData.token || !config.useAuthentication
      ? <Route path={path} exact={exact}>{ children }</Route>
      : <Redirect to={{ pathname: '/login' }}></Redirect>
  );
}