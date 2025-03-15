export const utilities = {
  '.min-h-safe': {
    minHeight: 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
  },
  '@supports (height: 100svh)': {
    '.min-h-safe': {
      minHeight: 'calc(100svh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
    },
  },
};
