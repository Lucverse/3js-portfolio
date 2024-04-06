import { useEffect } from 'react';
import './BubbleEffect.css';

function BubbleEffect() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.width = '2rem';
      bubble.style.height = '2rem';
      bubble.style.left = e.pageX + 'px';
      bubble.style.top = e.pageY + 'px';
      document.body.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 4000);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}

export default BubbleEffect;