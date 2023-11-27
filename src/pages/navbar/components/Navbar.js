import React, { useState, useEffect, useRef } from "react";
import Logo from '../icons/meister-logo.png';
import { AiOutlineMenu } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import styles from '../cssModules/navbar.module.css';
import { navItems} from '../helper/navItems';
import CustomLink from "../components/CustomLink";


const Navbar = () => {

  const [isMenuOpened, setIsMenuOpened] = useState(window.innerWidth <= 900 ? false : true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const nodeRef = useRef(null);  
  
  const togleMenu = () => {
    if(windowWidth <=900){
      setIsMenuOpened(curent => !curent)
    }      
  } 

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      if(window.innerWidth > 900) {
        setIsMenuOpened(true);
      } else {
        setIsMenuOpened(false);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  
  return (
    <nav className={styles.container}> 
      <div className={styles.logoMenue}>     
        <img className={styles.logo} src={Logo} alt="logo" />
        <div onClick={togleMenu}>            
          <AiOutlineMenu className={styles.menue} />
        </div>
      </div> 
      <CSSTransition
              in={isMenuOpened}
              nodeRef={nodeRef}
              timeout={300}
              classNames={{
                enter: styles.menuEnter,
                enterActive: styles.menuEnterActive,                
                enterDone: styles.menuEnterDone,
                exit: styles.menuExit,
                exitActive: styles.menuExitActive               
              }}
              unmountOnExit
          >     
      <ul ref={nodeRef} className={isMenuOpened && windowWidth <=900 ? styles.linksContainerOnMenueClick : styles.linksContainer}> 
        {
          navItems.map ((item, index) => {
            return (              
              <CustomLink key={index}
                          navItem={item}
                          togleMenu={togleMenu}
                          windowWidth={windowWidth}                          
              />                         
            )
          })
        }
      </ul> 
      </CSSTransition>     
    </nav>
  )
} 
export default Navbar;