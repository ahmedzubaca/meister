import { useEffect, useState } from 'react';

function useWindowResize() {  
  const [windowSize, setWindowSize] = useState({windowWidth: window.innerWidth,
                                                windowHeight: window.innerHeight});
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({windowWidth: window.innerWidth,
        windowHeight: window.innerHeight});
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return windowSize;
}

export default useWindowResize;







