import { tw } from '@/utils';

type Props = React.ComponentPropsWithRef<'input'>;
export default function Input({ className, ref, ...props }: Props) {
  return (
    <input
      {...props}
      ref={ref}
      className={tw(
        'outline-none bg-transparent text-body2 placeholder-text-text-subtitle px-4 py-[0.8rem] text-text',
        className,
      )}
    />
  );
}
