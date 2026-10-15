import confetti from 'canvas-confetti';

/**
 * Fires an editorial champagne-gold confetti burst
 */
export const fireCelebrationConfetti = () => {
  const count = 120;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#e7dca8', '#f5f2eb', '#34d399', '#c9ba80', '#ffffff'],
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
