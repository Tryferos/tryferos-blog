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
