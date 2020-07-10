import React from 'react';
import { Switch } from "react-router-dom";

import AuthenticatedRoute from "./AuthenticatedRoute";

// Components
const Dashboard = React.lazy(() => import('../components/Dashboard'));
const Portfolio = React.lazy(() => import('../components/Career/Portfolio/Portfolio'));
const Project = React.lazy(() => import('../components/Career/Project/Project'));
const ProjectNew = React.lazy(() => import('../components/Career/Project/ProjectNew'));
const Award = React.lazy(() => import('../components/Career/Award'));
const Resume = React.lazy(() => import('../components/Career/Resume'));
const Website = React.lazy(() => import('../components/Career/Website'));
const SocialMedia = React.lazy(() => import('../components/Career/SocialMedia'));
const Interview = React.lazy(() => import('../components/Career/Interview'));
const Apply = React.lazy(() => import('../components/Job/Apply'));
const Statistics = React.lazy(() => import('../components/Job/Statistics'));
const Connections = React.lazy(() => import('../components/Connections'));
const Compose = React.lazy(() => import('../views/Apps/Email/Compose/Compose'));
const Inbox = React.lazy(() => import('../views/Apps/Email/Inbox/Inbox'));
const Message = React.lazy(() => import('../views/Apps/Email/Message/Message'));

const SiteRoutes = (props) => {
  return (
    <div>
      <Switch>
        <AuthenticatedRoute path={'/dashboard'} component={Dashboard} {...props} />
        <AuthenticatedRoute  path={'/career/portfolios'} component={Portfolio} {...props} />
        <AuthenticatedRoute  path={'/career/projects'} component={Project} {...props} />
        <AuthenticatedRoute  path={'/career/projectNew'} component={ProjectNew} {...props} />
        <AuthenticatedRoute  path={'/career/awards'} component={Award} {...props} />
        <AuthenticatedRoute  path={'/career/resume'} component={Resume} {...props} />
        <AuthenticatedRoute  path={'/career/website'} component={Website} {...props} />
        <AuthenticatedRoute  path={'/career/socialmedia'} component={SocialMedia} {...props} />
        <AuthenticatedRoute  path={'/career/interview'} component={Interview} {...props} />
        <AuthenticatedRoute  path={'/job/apply'} component={Apply} {...props} />
        <AuthenticatedRoute  path={'/job/statistics'} component={Statistics} {...props} />
        <AuthenticatedRoute  path={'/connections'} component={Connections} {...props} />
        <AuthenticatedRoute  path={'/apps'} component={Compose} {...props} />
        <AuthenticatedRoute  path={'/apps/email/compose'} component={Compose} {...props} />
        <AuthenticatedRoute  path={'/apps/email/inbox'} component={Inbox} {...props} />
        <AuthenticatedRoute  path={'/apps/email/message'} component={Message} {...props} />
      </Switch>
    </div>
  )
}

export default SiteRoutes;
