import { tw } from '@/utils';

type Props = {
  label: string;
  count: number;
  className?: string;
};
export default function CountText({ label, count, className }: Props) {
  return (
    <div className={tw('flex gap-[1.6rem] items-center text-text-primary text-caption', className)}>
      <span>{label}</span>
      <span>
        총 <span className="text-primary">{count}</span>건
      </span>
    </div>
  );
}
