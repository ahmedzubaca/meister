import Homepage from '../home/Home';
import About from '../about/About';
import Contact from '../contact/Contact';
import Projects from '../projects/components/Projects';
import SingleProject from '../projects/components/SingleProject';

const routesData = [
  { path: '/', component: Homepage },
  { path: '/about', component: About },  
  { path: '/projects/:projectsCategory', component: Projects },
  { path: '/projects/:projectsCategory/:projectTitle', component: SingleProject },
  { path: '/contact', component: Contact },
];
export default routesData;