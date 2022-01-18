import {
  RouteInfo
} from './sidebar.metadata';

// Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [{
  path: '/dashboard',
  title: 'Dashboard',
  icon: 'ft-home',
  class: '',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: []
},
{
  path: '//users',
  title: 'Customers',
  icon: 'ft-users',
  class: '',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: []
},
{
  path: '//host',
  title: 'Organisers',
  icon: 'fa fa-user-circle-o',
  class: 'has-sub',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: [
    {
      path: '//venuer',
      title: 'Venue Owner',
      icon: 'fa fa-user',
      class: '',
      badge: '',
      badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
      isExternalLink: false,
      submenu: []
    },
    {
      path: '//host',
      title: 'Host',
      icon: 'fa fa-user',
      class: '',
      badge: '',
      badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
      isExternalLink: false,
      submenu: []
    },
    {
      path: '//promoter',
      title: 'Promoter',
      icon: 'fa fa-user',
      class: '',
      badge: '',
      badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
      isExternalLink: false,
      submenu: []
    },
    {
      path: '//member',
      title: 'Member',
      icon: 'fa fa-user',
      class: '',
      badge: '',
      badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
      isExternalLink: false,
      submenu: []
    },
  ]
},
{
  path: '//event',
  title: 'Events',
  icon: 'fa fa-building-o',
  class: '',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: []
},
{
  path: '//archived-events',
  title: 'Archived-Events',
  icon: 'fa fa-building-o',
  class: '',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: []
},
{
  path: '//paidevents',
  title: 'Paid Events',
  icon: 'fa fa-building-o',
  class: '',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: []
},
// {
//   path: '/events',
//   title: 'Events',
//   icon: 'fa fa-building-o',
//   class: 'has-sub',
//   badge: '',
//   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
//   isExternalLink: false,
//   submenu: [
//     {
//       path: '//event',
//       title: 'Current Event',
//       icon: '',
//       class: '',
//       badge: '',
//       badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
//       isExternalLink: false,
//       submenu: []
//     },
//     {
//       path: '//event',
//       title: 'Upcomming Event',
//       icon: '',
//       class: '',
//       badge: '',
//       badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
//       isExternalLink: false,
//       submenu: []
//     },
//      {
//       path: '//event',
//       title: 'Past Event',
//       icon: '',
//       class: '',
//       badge: '',
//       badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
//       isExternalLink: false,
//       submenu: []
//     }
//   ]
// },
{
  path: '//home-page-design',
  title: 'Home Page Design',
  icon: 'fa fa-home',
  class: '',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: []
},
{
  path: '//categories',
  title: 'Categories',
  icon: 'fa fa-clone',
  class: '',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: []
},
// {
//   path: '//subCategory',
//   title: 'Sub Categories',
//   icon: 'fa fa-th-large',
//   class: '',
//   badge: '',
//   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
//   isExternalLink: false,
//   submenu: []
// },
{
  path: '//venue',
  title: 'Venues',
  icon: 'fa fa-map-marker',
  class: '',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: []
},
{
  path: '/payments',
  title: 'Payments',
  icon: 'fa fa-credit-card',
  class: 'has-sub',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: [
    {
      path: '//user-payment',
      title: 'User Payments',
      icon: '',
      class: '',
      badge: '',
      badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
      isExternalLink: false,
      submenu: []
    },
    {
      path: '//organiser-payment',
      title: 'Organiser Payments',
      icon: '',
      class: '',
      badge: '',
      badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
      isExternalLink: false,
      submenu: []
    }]
},
{
  path: '//sub-admin',
  title: 'Sub-Admin',
  icon: 'ft-users',
  class: '',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: []
},
// {
//   path: '//team',
//   title: 'Contact Us',
//   icon: 'fa fa-home',
//   class: '',
//   badge: '',
//   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
//   isExternalLink: false,
//   submenu: []
// },
{
  path: '//support',
  title: 'Support',
  icon: 'fa fa-comments',
  class: '',
  badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  isExternalLink: false,
  submenu: []
},
  // {
  //   path: '//terms-and-conditions',
  //   title: 'Terms & Service',
  //   icon: 'fa fa-file-text-o',
  //   class: '',
  //   badge: '',
  //   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //   isExternalLink: false,
  //   submenu: []
  // },
  // {
  //   path: '//privacy-policy',
  //   title: 'Privacy Policy',
  //   icon: 'fa fa-lock',
  //   class: '',
  //   badge: '',
  //   badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
  //   isExternalLink: false,
  //   submenu: []
  // }

];