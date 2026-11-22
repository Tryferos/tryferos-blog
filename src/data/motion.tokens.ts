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

export const copyIconShown = { opacity: 1, scale: 1, filter: 'blur(0px)' };
export const copyIconHidden = { opacity: 0, scale: 0.6, filter: 'blur(4px)' };
const easeOutQuint = { x1: 0.22, y1: 1, x2: 0.36, y2: 1 };

export const copyIconTransition = {
  duration: 0.3,
  ease: [easeOutQuint.x1, easeOutQuint.y1, easeOutQuint.x2, easeOutQuint.y2],
} as const;
export const copiedConfirmationMilliseconds = 3000;

export const illustrationHidden = { opacity: 0 };
export const illustrationShown = { opacity: 1 };
export const illustrationRevealTransition = {
  duration: 0.4,
  ease: [easeOutQuint.x1, easeOutQuint.y1, easeOutQuint.x2, easeOutQuint.y2],
} as const;
