import { colors } from '@/styles/theme/colors';
import { typography } from '@/styles/theme/typography';
import { ClassNameValue, extendTailwindMerge } from 'tailwind-merge';

const typographyKeys = Object.keys(typography);
const colorKeys = Object.entries(colors).flatMap(([key, value]) => {
  if (typeof value === 'object') {
    return Object.keys(value).map((subKey) => (subKey === 'DEFAULT' ? key : `${key}-${subKey}`));
  }
  return key;
});

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: typographyKeys,
      color: colorKeys,
    },
  },
});

type Props = Array<ClassNameValue | Record<string, boolean | undefined | null>>;
export const tw = (...classLists: Props) => {
  const classNames = classLists.flatMap((classList) => {
    if (classList !== null && typeof classList === 'object' && !Array.isArray(classList)) {
      return Object.keys(classList).filter((key) => Boolean(classList[key]));
    }
    return classList;
  });

  return customTwMerge(classNames);
};
