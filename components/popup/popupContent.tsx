import { useContext } from 'react';
import { PopupContext } from './popupContext';
import { tw } from '@/utils';
import Icon from '@/components/icon';

type Props = {
  className?: string;
  closeButton?: boolean;
  children: ((close: () => void) => React.ReactNode) | React.ReactNode;
};

export function PopupContent({ className, closeButton, children }: Props) {
  const { isOpen, close } = useContext(PopupContext);

  if (!isOpen) return null;

  return (
    <div className={tw('absolute px-[2.4rem] py-[3.6rem]', className)}>
      {closeButton && (
        <button className="absolute right-[0.8rem] top-[0.8rem]" onClick={close}>
          <Icon name="close" size="2rem" className="text-gray" />
        </button>
      )}
      {typeof children === 'function' ? children(close) : children}
    </div>
  );
}
