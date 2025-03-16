import SearchIcon from './search.svg';
import LikeLineIcon from './likeLine.svg';
import LikeFillIcon from './likeFill.svg';
import CloseIcon from './close.svg';
import ArrowUpIcon from './arrowUp.svg';
import ArrowDownIcon from './arrowDown.svg';

type SvgrIconType = React.FC<React.SVGProps<SVGSVGElement>>;

const iconMap: Record<string, SvgrIconType> = {
  search: SearchIcon,
  likeLine: LikeLineIcon,
  likeFill: LikeFillIcon,
  close: CloseIcon,
  arrowUp: ArrowUpIcon,
  arrowDown: ArrowDownIcon,
};

type Props = {
  name: keyof typeof iconMap;
  size?: number | string;
} & React.SVGProps<SVGSVGElement>;

export default function Icon({ name, size, ...props }: Props) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;

  return <IconComponent {...props} width={size} height={size} />;
}
