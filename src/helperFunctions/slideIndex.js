import {useEffect, useRef, useState} from 'react';

export default function useSlideIndex(imgArray) {
  const [slideIndex, setSlideIndex] = useState(0);  
  const slidesRef = useRef(0); 
 
  const stopSlideShow = () => {
    window.clearInterval(slidesRef.current)
  } 
  
  useEffect(() => {
    slidesRef.current = window.setInterval(() => {
      if(imgArray && slideIndex >= imgArray.length -1)
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

  return slideIndex;
}