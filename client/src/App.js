import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./components/Login/Login'));
const Register = React.lazy(() => import('./components/Login/Register'));
const Page404 = React.lazy(() => import('./components/Login/Page404'));
const Page403 = React.lazy(() => import('./components/Login/Page403'));
const Page500 = React.lazy(() => import('./components/Login/Page500'));
const Portfolio = React.lazy(() => import('./components/Career/Portfolio/Portfolio'));

const BASE_PATH = '/login';

const App = (props) => {

    return (
      <div>
        <Router>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                {/* <Route path="/dashboard" name="Home" component={DefaultLayout} /> */}
                <Route path="/career/portfolios" name="Portfolio" component={Portfolio} />
                <Route path="/dashboard" name="Home" render={props => <DefaultLayout {...props}/>} />
              </Switch>
            </React.Suspense>
        <Redirect from="/" to={`${BASE_PATH}`} noThrow />
        </Router>
      </div>
    );
}

export default App;
