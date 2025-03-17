import dynamic from 'next/dynamic';

const iconMap = {
  search: dynamic(() => import('@/assets/icons/search.svg')),
  likeLine: dynamic(() => import('@/assets/icons/likeLine.svg')),
  likeFill: dynamic(() => import('@/assets/icons/likeFill.svg')),
  close: dynamic(() => import('@/assets/icons/close.svg')),
  arrowUp: dynamic(() => import('@/assets/icons/arrowUp.svg')),
  arrowDown: dynamic(() => import('@/assets/icons/arrowDown.svg')),
  book: dynamic(() => import('@/assets/icons/book.svg')),
} as const;

export type IconName = keyof typeof iconMap;

type SvgrComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Props = {
  name: IconName;
  size?: `${number}px` | `${number}rem`;
} & React.SVGProps<SVGSVGElement>;

export default function Icon({ name, size = '2rem', ...props }: Props) {
  const IconComponent = iconMap[name] as SvgrComponent;
  if (!IconComponent) return null;

  return <IconComponent {...props} width={size} height={size} />;
}
