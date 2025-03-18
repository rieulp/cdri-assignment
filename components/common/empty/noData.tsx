import Icon, { IconName } from '@/components/common/icon';
import { tw } from '@/utils';

type Props = {
  icon: IconName;
  label: string;
  className?: string;
};

export default function NoData({ icon, label, className }: Props) {
  return (
    <div className={tw('flex flex-col items-center gap-[2.4rem]', className)}>
      <Icon name={icon} size="8rem" />
      <p className="text-caption text-text-secondary">{label}</p>
    </div>
  );
}
