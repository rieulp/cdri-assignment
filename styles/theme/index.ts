import { colors } from './colors';
import { typography } from './typography';
import { utilities } from './utilities';

const theme = {
  extend: {
    colors,
    fontSize: typography,
  },
};

export { theme, utilities };
