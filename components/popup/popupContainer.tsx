import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { PopupContext } from './popupContext';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

export function PopupContainer({ children, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  useClickOutside(containerRef, close);

  useEffect(() => {
    if (!isOpen) onClose?.();
  }, [isOpen, onClose]);

  return (
    <PopupContext.Provider value={{ isOpen, close, toggle }}>
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </PopupContext.Provider>
  );
}
