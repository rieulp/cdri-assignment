export const withPreventDefault =
  (handler?: (...args: any[]) => void, ...args: any[]) =>
  (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    handler?.(...args);
  };
