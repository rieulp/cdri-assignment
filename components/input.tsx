import tw from '@/utils/tw';

type Props = React.InputHTMLAttributes<HTMLInputElement>;
export default function Input({ className, ...props }: Props) {
  return (
    <input
      {...props}
      className={tw(
        'outline-none border-none bg-transparent text-body2 placeholder-text-text-subtitle px-4 py-[0.8rem] text-text',
        className,
      )}
    />
  );
}
