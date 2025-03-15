'use client';

import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';

type Props = {
  activeClassName: string;
} & LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function ActiveLink({ activeClassName, className = '', ...props }: Props) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link {...props} className={clsx(className, { [activeClassName]: isActive })}>
      {props.children}
    </Link>
  );
}
