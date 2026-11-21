const hidden = { opacity: 0 };
const shown = { opacity: 1, y: 0 };

export const headerReveal = {
  initial: { ...hidden, y: 8 },
  animate: shown,
};

export const sectionReveal = {
  initial: { ...hidden, y: 12 },
  animate: shown,
};

export const firstSectionDelaySeconds = 0.05;
export const sectionStaggerSeconds = 0.05;

export const codeVersionShown = { opacity: 1, filter: 'blur(0px)' };
export const codeVersionHidden = { opacity: 0, filter: 'blur(6px)' };
export const codeVersionSwitchSeconds = 0.3;
export const selectedSegmentTransition = {
  type: 'spring',
  bounce: 0.15,
  duration: 0.3,
} as const;
