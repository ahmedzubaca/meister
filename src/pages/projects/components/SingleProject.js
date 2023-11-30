import React, {useState, useRef, useEffect} from "react";
import Footer from '../../../components/Footer';
import { useLocation } from "react-router-dom";
import useWindowResize from "../../../helperFunctions/windowWidth";
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import styles from '../cssModules/singleProject.module.css';

const SingleProject = () => {
  const {state} = useLocation();   
  const windowSize = useWindowResize(); 
  const [ slideIndex, setSlideIndex ] = useState(0);
  const touchStartX = useRef(null);
  const [ projectData ] = useState(state);
  const isMobile = windowSize.windowWidth < 500 || ((windowSize.windowWidth >=500 &&  windowSize.windowWidth < 950) && windowSize.windowHeight < 500 )  ? true : false; 
  const [ slider, setSlider] = useState(false);

  const calculateImgHeight = (viewportWidth, viewportHeight) => {    
    if((viewportWidth >= 500 && viewportWidth <= 950)&&(viewportHeight <= 500)) {
      return 80 * viewportHeight / 100;
    }
    else if((viewportWidth >= 500 && viewportWidth <= 950)&&(viewportHeight > 500)) {
      return 9* (40 * viewportWidth/100) / 16
    }
    else if(viewportWidth >= 950 && viewportWidth < 1200) {
      return 9* (30 * viewportWidth/100) / 16
    }
    else if(viewportWidth >= 1200) {
      return 9* (20 * viewportWidth/100) / 16
    }
    else {
      return 9 * viewportWidth / 16
    }    
  }
  const imgHeight = calculateImgHeight(windowSize.windowWidth, windowSize.windowHeight);

  const handlePreviousArrow = () => {
    if(slideIndex > 0)
    setSlideIndex(prev => prev - 1)
  }
  const handleNextArrow = () => {
    if(slideIndex < projectData.images.length -1)
    setSlideIndex(prev => prev + 1)
  }

  const handleDotClick = (number) => {
    setSlideIndex(number); 
    if(number === projectData.images.length -1 || number === 0) setSlider(prev => !prev);   
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;    
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;

    if (diff > 50 ) {
      handlePreviousArrow();
      setSlider(prev => !prev)
    }
    if (diff < -50 ) {
      handleNextArrow();
      setSlider(prev => !prev)
    }

    touchStartX.current = null;
    
  };

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    console.log('useEffect')
    return () => {      
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };    
  }, [slider]); // eslint-disable-line react-hooks/exhaustive-deps

  return(
    <> 
    {
      isMobile ?     
        <div className={styles.overallContainer} >
          <div className={styles.titleSizeContainer}
               onTouchStart={handleTouchStart}
               onTouchEnd={handleTouchEnd}
          >
            <h3> {projectData.title} </h3>
            <h4> {projectData.size} </h4>
          </div>
          <div className={styles.imgContainer}> 
          <img src={require(`../images/${projectData.projectsCategory}/${projectData.id}/${projectData.images[slideIndex]}`)} alt='slika'
                style={{height: imgHeight}}
                className={styles.projectImg}                 
            /> 
              <BiCaretLeft className={`${styles.previous} ${slideIndex > 0 ? styles.show : ''}`}
                              onClick={handlePreviousArrow}
              />    
              <BiCaretRight className={`${styles.next} ${slideIndex < projectData.images.length - 1 ? styles.show : '' }`}
                            onClick={handleNextArrow}
              />            
              <div className={styles.dots}>
                  {
                    projectData.images.map((slide, index) => (
                      <span key = {index} 
                            className={`${styles.dot} ${slideIndex === index ? styles.active : ''}`}
                            onClick={() => handleDotClick(index)}            
                      >              
                      </span>
                    ))
                  } 
              </div>
          </div>        
          <div className={styles.description}>
            <h4> Opis projekta</h4>
            <p> {projectData.description} </p>
          </div>                      
        </div>
       : 
       <div className={styles.overallContainer} >
          <div className={styles.titleSizeContainer}>
            <h3> {projectData.title} </h3>
            <h4> {projectData.size} </h4>
          </div>
          <div className={styles.imgContainer}>        
            {
              projectData.images.map((image, index) => (
                <img key={index} 
                     src={require(`../images/${projectData.projectsCategory}/${projectData.id}/${image}`)} alt='slika' 
                     style={{height: imgHeight}}
                />    
              ))
            } 
        </div>              
          <div className={styles.description}>
            <h4> Opis projekta</h4>
            <p> {projectData.description} </p>
          </div>                      
        </div> 
      } 
      <div>
        <Footer />
    </div>     
    </>  
  )
}
export default SingleProject;