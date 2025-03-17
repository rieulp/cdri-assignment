import Icon, { IconName } from '@/components/icon';

type Props = {
  icon: IconName;
  label: string;
};

export default function NoData({ icon, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-[2.4rem]">
      <Icon name={icon} size="8rem" />
      <p className="text-caption text-text-secondary">{label}</p>
    </div>
  );
}
