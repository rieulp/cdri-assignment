import { colors } from '@/styles/theme/colors';
import { typography } from '@/styles/theme/typography';
import { ClassNameValue, extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: Object.keys(typography),
      color: Object.entries(colors).flatMap(([key, value]) => {
        if (typeof value === 'object') {
          return Object.keys(value).map((subKey) => {
            return subKey === 'DEFAULT' ? key : `${key}-${subKey}`;
          });
        }
        return key;
      }),
    },
  },
});

type Props = Array<ClassNameValue | Record<string, boolean>>;
export default function tw(...classLists: Props) {
  const classNames = classLists.map((classList) => {
    if (typeof classList === 'object' && classList !== null && !Array.isArray(classList)) {
      return Object.keys(classList).filter((key) => classList[key]);
    }
    return classList;
  });

  return customTwMerge(classNames);
}
