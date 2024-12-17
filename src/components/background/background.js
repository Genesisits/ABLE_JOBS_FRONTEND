import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import './background.css'; 

import popSoundFile from '../../sound/sound.mp3';

const BackGround = () => {
  useEffect(() => {
    const delay = 3 * 1000;

    setTimeout(() => {
      const duration = 1 * 1000; 
      const animationEnd = Date.now() + duration;

      const popSound = new Audio(popSoundFile);

      const launchConfetti = (originX) => {
        confetti({
          particleCount: 10,
          spread: 300,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 10,
          spread: 300,
          origin: { x: 1 },
        });
        popSound.play().catch((error) => {
          console.error('Failed to play the sound:', error);
        });
      };

      (function frame() {
        launchConfetti(0);
        launchConfetti(1);

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      })();


      setTimeout(() => {
        popSound.play().catch((error) => {
          console.error('Failed to play the sound:', error);
        });
      }, duration);
    }, delay);
  }, []); 

  return (
    <div >
     
    </div>
  );
};

export default BackGround;
