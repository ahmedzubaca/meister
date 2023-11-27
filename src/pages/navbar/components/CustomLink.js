import React, { useState, useRef } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { AiFillCaretDown } from 'react-icons/ai';
import  { CSSTransition } from 'react-transition-group';
import styles from '../cssModules/customLink.module.css';

const CustomLink = ({ navItem, togleMenu }) => { 
   
  const resolvedPath = useResolvedPath(navItem.route);
  const isActive = useMatch({ path: resolvedPath.pathname, end: navItem.route === "/" ? true : false });
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef(null);
      

  const handleMouseEnter = () => {
    setIsHovered(true);  };

  const handleMouseLeave = () => {    
      setIsHovered(false);      
  };
  
  const handleSubmenuItemClick = () => {
    
    setIsHovered(false);
    togleMenu();
  }
 
  return (  
    <li onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}        
        className={styles.menuItem}
    > 
      {
        !navItem.submenu
        ?
          <Link to={!navItem.submenu ? navItem.route : null } 
            className={`${styles.menuItemLink} ${isActive ? styles.active : ""} `}
            onClick={togleMenu}            
          >
            {navItem.name}
          </Link>
        :
        <span className={`${styles.menuItemLink} ${isActive ? styles.active : ""} `}>{navItem.name} <AiFillCaretDown /></span>
      } 
      {
        navItem.submenu &&
        (
          <CSSTransition
              in={isHovered}
              nodeRef={nodeRef}
              timeout={300}
              classNames={{
                enter: styles.submenuEnter,
                enterActive: styles.submenuEnterActive,                
                enterDone: styles.submenuEnterDone,
                exit: styles.submenuExit,
                exitActive: styles.submenuExitActive               
              }}
              unmountOnExit
          >
            <ul ref={nodeRef} className={styles.dropdownMenu} >
              {navItem.submenu.map((item, index) => (
                <li key={index} className={styles.dropdownMenuItem}>
                  <Link to={`${navItem.route}/${item.route}`}
                        className={`${styles.dropdownMenuItemLink} ${navItem.route + '/' +item.route === window.location.pathname ? styles.active : ""}`}
                        onClick={handleSubmenuItemClick}                    
                  > 
                  {item.name}               
                  </Link>
                </li>
              ))}
            </ul>
          </CSSTransition>
        )        
      } 
    </li>           
  )
}
export default CustomLink;