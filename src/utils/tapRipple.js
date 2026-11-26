export function triggerTapRipple(event) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const target = event.currentTarget;
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const clientX =
    event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX;
  const clientY =
    event.touches && event.touches[0] ? event.touches[0].clientY : event.clientY;

  const x = (clientX ? clientX - rect.left : rect.width / 2) - size / 2;
  const y = (clientY ? clientY - rect.top : rect.height / 2) - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'tap-ripple';
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  target.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}
