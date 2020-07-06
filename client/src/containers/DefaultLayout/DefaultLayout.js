import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import AuthenticatedRoute from '../../routes/AuthenticatedRoute';
// import routes from '../../routes/SiteRoutes'
import SiteRoutes from '../../routes/SiteRoutes'

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
// import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = (props) => {
  const loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  const signOut = (e) => {
    e.preventDefault()
    props.history.push('/login')
  }

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={loading()}>
            <DefaultHeader onLogout={e=>signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes}/> */}
            <Container fluid>
              <Suspense fallback={loading()}>
                <SiteRoutes/>
                  <Redirect from="/" to="/dashboard" />
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
}

export default DefaultLayout;
