import { useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/common';
import { PopupContext } from './popupContext';
import { tw } from '@/utils';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
};

export function PopupContainer({ children, className, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    if (!isOpen) return;
    setIsOpen(false);
    onClose?.();
  };
  const toggle = () => setIsOpen((prev) => !prev);

  useClickOutside(containerRef, close);

  return (
    <PopupContext.Provider value={{ isOpen, close, toggle }}>
      <div ref={containerRef} className={tw('relative', className)}>
        {children}
      </div>
    </PopupContext.Provider>
  );
}
