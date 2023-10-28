import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from '../cssModules/customLink.module.css';


const CustomLink = ({ navItem, togleMenu, children}) => { 
   
  const resolvedPath = useResolvedPath(navItem.route);
  const isActive = useMatch({ path: resolvedPath.pathname, end: navItem.route === "/" ? true : false });
  const [isHovered, setIsHovered] = useState(false);    

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  }; 
  
  return (  
    <li onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}        
        className={styles.menuItem}
    >               
      <Link to={!navItem.submenu ? navItem.route : null } 
            className={`${styles.menuItemLink} ${isActive ? styles.active : ""} `}
            onClick={!navItem.submenu ? togleMenu : null}            
      >
        {children}
      </Link>
      {
        navItem.submenu ?
        <ul className={`${styles.dropdownMenu} ${isHovered ? styles.show : ''}`}>
          {navItem.submenu.map((item, index) => (
            <li key={index} className={styles.dropdownMenuItem}>
              <Link to={`${navItem.route}/${item.route}`}
                    className={`${styles.dropdownMenuItemLink} ${navItem.route + '/' +item.route === window.location.pathname ? styles.active : ""}`}
                    onClick={togleMenu}                    
              > 
              {item.name}               
              </Link>
            </li>
          ))}
        </ul>
        : null
      } 
    </li>           
  )
}
export default CustomLink;