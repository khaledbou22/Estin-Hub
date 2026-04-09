/** Shared Framer Motion presets for homepage — keep timing consistent */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const sectionFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export const staggerChildren = (delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: delay },
  },
});

export const itemFadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};
