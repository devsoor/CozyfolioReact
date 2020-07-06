import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { AuthContext } from "./Auth/Context";
import SiteRoutes from "./routes/SiteRoutes";
import AuthenticatedRoute from './routes/AuthenticatedRoute';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

const Login = React.lazy(() => import('./Auth/Login'));
const Register = React.lazy(() => import('./Auth/Register'));
// const Page404 = React.lazy(() => import('./Auth/Page404'));
// const Page403 = React.lazy(() => import('./Auth/Page403'));
// const Page500 = React.lazy(() => import('./Auth/Page500'));
// const Portfolio = React.lazy(() => import('./components/Career/Portfolio/Portfolio'));

const BASE_PATH = '/login';

const App = (props) => {
  // const existingTokens = {
  //   accessToken: localStorage.getItem('access_token'),
  //   refreshToken: localStorage.getItem('refresh_token')
  // }

  const getTokens = () => {
    try {
        const token = JSON.parse(localStorage.getItem('access_token'));
        return token
    } catch (e) {
        return null;
    }
  }

  // const existingTokens = JSON.parse(localStorage.getItem('access_token'));
  const existingTokens = getTokens();
  // console.log("App.js: existingTokens = ", existingTokens)
  const [authTokens, setAuthTokens] = useState(existingTokens);

  // const setTokens = (accessToken, refreshToken) => {
  //   localStorage.setItem('access_token', accessToken)
  //   localStorage.setItem('refresh_token', refreshToken)
  //   const data = {};
  //   data['accessToken'] = accessToken;
  //   data['refreshToken'] = refreshToken;
  //   setAuthTokens(data);
  // }

  const setTokens = (data) => {
    JSON.stringify(localStorage.setItem("accessToken", data.access_token));
    setAuthTokens(data.access_token);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Suspense fallback={loading()}>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
            <AuthenticatedRoute path={'/'} component={DefaultLayout} {...props} />

        </Suspense>
        <Redirect from="/" to={`${BASE_PATH}`} noThrow />
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
