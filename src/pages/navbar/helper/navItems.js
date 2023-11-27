export const navItems = [
  {
    route: '/',
    name: 'POČETNA'
  },
  {
    route: '/about',
    name: 'O NAMA'
  },  
  {
    route: '/projects',
    name: 'PROJEKTI',
    submenu: [
      {
        route: 'completedProjects',
        name: 'ZAVRŠENI PROJEKTI',
      },
      {
        route: 'ongoingProjects',
        name: 'PROJEKTI U RADU',
      }
    ]
  },
  {
    route: '/contact',
    name: 'KONTAKT'
  }
]