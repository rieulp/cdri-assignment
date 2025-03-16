import { useContext } from 'react';
import { PopupContext } from './popupContext';

type TriggerProps<T extends React.ElementType> = {
  as?: T;
} & Omit<React.ComponentPropsWithRef<T>, 'as'>;

export function TriggerButton<T extends React.ElementType = 'button'>({ as, children, ...props }: TriggerProps<T>) {
  const { toggle } = useContext(PopupContext);
  const Component = as || 'button';

  return (
    <Component {...props} onClick={toggle}>
      {children}
    </Component>
  );
}
