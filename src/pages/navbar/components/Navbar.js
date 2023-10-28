import React, { useState, useEffect} from "react";
import Logo from '../icons/meister-logo.png';
import { AiOutlineMenu, AiFillCaretDown } from 'react-icons/ai';
import styles from '../cssModules/navbar.module.css';
import { menuItems} from '../helper/menuItems';
import CustomLink from "../components/CustomLink";

const Navbar = () => {

  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);  
  
  const togleMenu = () => {
    if(windowWidth <=900){
      setIsMenuOpened(curent => !curent)
    }    
  } 

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
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
      <ul className={isMenuOpened && windowWidth <=900 ? styles.linksOnMenueClick : styles.links}> 
        {
          menuItems.map ((item, index) => {
            return (              
                <CustomLink key={index}
                            navItem={item}
                            togleMenu={togleMenu}
                            >
                            {item.name} { item.submenu ? <AiFillCaretDown /> : null } 
                </CustomLink>              
            )
          })
        }
      </ul>      
    </nav>
  )
} 
export default Navbar;