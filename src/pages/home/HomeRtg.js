import React, {useState, useRef, useEffect} from "react";
import { TransitionGroup, CSSTransition} from 'react-transition-group';
//import useSlideIndex from "../../helperFunctions/slideIndex";
import Footer from '../../components/Footer';
import styles from './home.module.css';

const Home = () => {

  const images = require.context('./images');
  const slides = images.keys().map(image => images(image));
  const [slideIndex, setSlideIndex] = useState(0);  
  const slidesRef = useRef(0); 
 
  const stopSlideShow = () => {
    window.clearInterval(slidesRef.current)
  } 
  
  useEffect(() => {
    slidesRef.current = window.setInterval(() => {
      if(slides && slideIndex >= slides.length -1)
      setSlideIndex(0)
      else
      setSlideIndex(
        prevSlideIndex => prevSlideIndex + 1
      )
    }, 5000)

    return() => {
      stopSlideShow();
    }
  }, [slideIndex])  //eslint-disable-line 
  

  return (
    <div className={styles.overallContainer}>
      <div className={styles.animationContainer}> 
        <TransitionGroup>
          <CSSTransition 
            key={slides[slideIndex]}
            timeout={300}
            classNames={{
              appear: styles.fadeAppear,
              appearActive: styles.fadeAppearActive,
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
              exit: styles.fadeExit,
              exitActive: styles.fadeExitActive,
              exitDone: styles.fadeExitDone               
            }}
          >
            <div className={styles.animatedDiv}              
              
            >  
            <img src={slides[slideIndex]} alt='slika' />       
            </div>

          </CSSTransition>
        </TransitionGroup>      
         
            <div className={styles.animatedDiv}
              
              style = {{                
                backgroundImage: `url(${slides[slideIndex]})`              
              }} 
            >        
            </div>         
               
        } 
        <div className={styles.textDiv}>
          <span className={styles.textSpan}>
            Posebnost, inovativnost i kvalitet naših zaposlenika 
            omogućava implementiranje konkurentske strategije 
            diferencijacije i čini okosnicu razvoja kompanije „Meister“.
          </span>      
        </div>      
      </div>
      <div>
        <Footer /> 
      </div>
    </div>   
  )
} 
export default Home;