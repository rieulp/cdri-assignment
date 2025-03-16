import tw from '@/utils/tw';

type ButtonSize = 'sm' | 'md';
type ButtonVariant = 'outline' | 'solid';
type ButtonColor = 'primary' | 'secondary';

type ButtonProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color: ButtonColor;
  ref?: React.Ref<HTMLButtonElement>;
};
type Props = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonStyle = {
  base: 'rounded-[0.8rem] border flex items-center gap-[0.2rem] justify-center shrink-0',
  size: {
    sm: 'p-[1rem] text-body2 h-[3.5rem]',
    md: 'px-[2rem] py-[1.3rem] h-[4.8rem] text-caption',
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
} as const;

export const Button = ({ size = 'md', variant = 'solid', color = 'primary', children, className, ...props }: Props) => {
  return (
    <button
      className={tw(ButtonStyle.base, ButtonStyle.size[size], ButtonStyle.variant[variant][color], className)}
      {...props}
    >
      {children}
    </button>
  );
};
