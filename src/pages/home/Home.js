import React from "react";
import {useTransition, animated} from 'react-spring';
import useSlideIndex from "../../helpers/slideIndex";
import styles from './home.module.css';

const Home = () => {

  const images = require.context('./images');
  const slides = images.keys().map(image => images(image));
  const slideIndex = useSlideIndex(slides);
  
  const transitions = useTransition(slideIndex, {    
    from: {opacity: 0},
    enter : {opacity: 1},
    leave: {opacity: 1},
    config: {duration: 1000}
  }); 
  
  return (
    <div> 
      {      
        transitions((style, index)  => (
          <animated.div
            className={styles.animatedDiv}
            style = {{
              ...style,
              backgroundImage: `url(${slides[index]})`              
            }}         
          />          
        ))      
      } 
      <div className={styles.textDiv}>
        <span className={styles.textSpan}>
          Posebnost, inovativnost i kvalitet naših zaposlenika 
          omogućava implementiranje konkurentske strategije 
          diferencijacije i čini okosnicu razvoja kompanije „Meister“.
        </span>      
      </div>
    </div>
  )
} 
export default Home;