import { useEffect, useState } from 'react';

export function useMediaPreferences() {
  const [prefs, setPrefs] = useState(() => {
    if (typeof window === 'undefined') {
      return { prefersReducedMotion: false, isMobile: true };
    }
    return {
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      isMobile: window.innerWidth < 768,
    };
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const update = () => {
      setPrefs({
        prefersReducedMotion: motionQuery.matches,
        isMobile: mobileQuery.matches,
      });
    };

    update();
    motionQuery.addEventListener('change', update);
    mobileQuery.addEventListener('change', update);

    return () => {
      motionQuery.removeEventListener('change', update);
      mobileQuery.removeEventListener('change', update);
    };
  }, []);

  return prefs;
}
