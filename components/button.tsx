import { tw } from '@/utils';
import Icon, { IconName } from './icon';

type ButtonSize = 'sm' | 'md';
type ButtonVariant = 'outline' | 'solid';
type ButtonColor = 'primary' | 'secondary';

type ButtonProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  icon?: IconName;
};
type Props = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonStyle = {
  base: 'flex items-center justify-center gap-[0.2rem] shrink-0 rounded-[0.8rem] border',
  size: {
    sm: 'p-[1rem] text-body2 h-[3.5rem]',
    md: 'px-[2rem] py-[1.6rem] h-[4.8rem] text-caption',
  },
  variant: {
    outline: {
      primary: 'border-primary text-primary',
      secondary: 'border-text-subtitle text-text-subtitle',
    },
    solid: {
      primary: 'bg-primary text-white border-primary',
      secondary: 'bg-lightGray text-text-secondary border-lightGray',
    },
  },
};

export const Button = ({
  size = 'md',
  variant = 'solid',
  color = 'primary',
  icon,
  children,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={tw(ButtonStyle.base, ButtonStyle.size[size], ButtonStyle.variant[variant][color], className)}
      {...props}
    >
      {children}
      {icon ? <Icon name={icon} size="1.6rem" className="-mr-[0.4rem]" /> : null}
    </button>
  );
};
