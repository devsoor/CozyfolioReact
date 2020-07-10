export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Career',
    },
    {
      name: 'Portfolios',
      url: '/career/portfolios',
      icon: 'icon-layers',
    },
    {
      name: 'Projects',
      url: '/career/projects',
      icon: 'icon-grid',
    },
    {
      name: 'Accomplishments',
      url: '/career/awards',
      icon: 'icon-star',
    },
    {
      name: 'Resume',
      url: '/career/resume',
      icon: 'icon-book-open',
    },
    {
      name: 'Website',
      url: '/career/website',
      icon: 'icon-globe',
    },
    {
      name: 'Social Media',
      url: '/career/socialmedia',
      icon: 'icon-social-linkedin',
    },
    {
      name: 'Interviews',
      url: '/career/interview',
      icon: 'icon-briefcase',
    },
    {
      title: true,
      name: 'Job',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Applications',
      url: '/job/apply',
      icon: 'icon-pencil',
    },
    {
      name: 'Statistics',
      url: '/job/statistics',
      icon: 'icon-graph',
    },
    {
      title: true,
      name: 'Apps',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Connections',
      url: '/connections',
      icon: 'icon-people',
    },
    {
          name: 'Email',
          url: '/apps/email',
          icon: 'icon-speech',
          children: [
            {
              name: 'Inbox',
              url: '/apps/email/inbox',
              icon: 'icon-speech',
            },
            {
              name: 'Message',
              url: '/apps/email/message',
              icon: 'icon-speech',
            },
            {
              name: 'Compose',
              url: '/apps/email/compose',
              icon: 'icon-speech',
            },
          ],

    },
  ]
};
