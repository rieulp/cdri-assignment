import { createContext } from 'react';

export type PopupContextType = {
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
};

export const PopupContext = createContext<PopupContextType>({
  isOpen: false,
  close: () => {},
  toggle: () => {},
});
