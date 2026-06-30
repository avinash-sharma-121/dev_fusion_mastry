import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
  children,
  animation = 'slide-up', // slide-up, slide-down, slide-left, slide-right, scale-up, fade-in
  delay = 0, // delay in seconds
  duration, // optional duration in seconds
  threshold = 0.1, // intersection threshold
  triggerOnce = true, // animate only once or every time it enters
  className = '',
  style = {}
}) => {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  const customStyle = {
    ...style,
    '--reveal-delay': `${delay}s`,
  };

  if (duration) {
    customStyle.transitionDuration = `${duration}s`;
  }

  const animationClass = `reveal-${animation}`;
  const revealedClass = isRevealed ? 'revealed' : '';

  return (
    <div
      ref={ref}
      className={`reveal ${animationClass} ${revealedClass} ${className}`.trim()}
      style={customStyle}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
