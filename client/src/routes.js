import React from 'react';

const Compose = React.lazy(() => import('./views/Apps/Email/Compose'));
const Inbox = React.lazy(() => import('./views/Apps/Email/Inbox'));
const Message = React.lazy(() => import('./views/Apps/Email/Message'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));

const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Portfolio = React.lazy(() => import('./components/Career/Portfolio'));
const Project = React.lazy(() => import('./components/Career/Project'));
const Resume = React.lazy(() => import('./components/Career/Resume'));
const Website = React.lazy(() => import('./components/Career/Website'));
const SocialMedia = React.lazy(() => import('./components/Career/SocialMedia'));
const Apply = React.lazy(() => import('./components/Job/Apply'));
const Statistics = React.lazy(() => import('./components/Job/Statistics'));
const Connections = React.lazy(() => import('./components/Connections'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/career/portfolios', name: 'Portfolio', component: Portfolio },
  { path: '/career/projects', name: 'Projects', component: Project },
  { path: '/career/resume', name: 'Resume', component: Resume },
  { path: '/career/website', name: 'Website', component: Website },
  { path: '/career/socialmedia', name: 'SocialMedia', component: SocialMedia },
  { path: '/job/apply', name: 'Apply', component: Apply },
  { path: '/job/statistics', name: 'Statistics', component: Statistics },
  { path: '/connections', name: 'Connections', component: Connections },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/apps', name: 'Apps', component: Compose, exact: true },
  { path: '/apps/email', name: 'Email', component: Compose, exact: true },
  { path: '/apps/email/compose', name: 'Compose', component: Compose },
  { path: '/apps/email/inbox', name: 'Inbox', component: Inbox },
  { path: '/apps/email/message', name: 'Message', component: Message },
];

export default routes;
