import { useState, useEffect } from 'react';


interface SizeProps {
      width: number
      height: number
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<SizeProps>({
      width: window.innerWidth,
      height: window.innerHeight,
  });

  const isMobile = windowSize.width < 478
  const isTablet = windowSize.width < 768

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function initially to set the initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
      ...windowSize,
      isMobile,
      isTablet
  };
}

export default useWindowSize