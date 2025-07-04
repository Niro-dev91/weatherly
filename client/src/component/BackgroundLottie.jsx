import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import windAnimation from '../assets/lottie/weather-animation.json';

export default function BackgroundLottie() {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: windAnimation,
    });

    anim.play();

    console.log('BackgroundLottie mounted & animation started');

    return () => {
      anim.destroy();
      console.log('BackgroundLottie unmounted & animation destroyed');
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-10"
      style={{
        filter: 'brightness(1.5) contrast(1.3) saturate(1.4)',
      }}
    />
  );
}
