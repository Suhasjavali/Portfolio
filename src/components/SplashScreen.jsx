import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinish }) => {
  const [fade, setFade] = useState('fade-in');

  useEffect(() => {
    // Let the text fade in slowly, then fade out the screen
    const fadeOutTimeout = setTimeout(() => setFade('fade-out'), 2000);
    const finishTimeout = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2600);
    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${fade}`}>
      <span className="splash-text">Hello</span>
    </div>
  );
};

export default SplashScreen; 