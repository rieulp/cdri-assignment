'use client';

import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import { tw } from '@/utils';

type Props = {
  activeClassName: string;
} & LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function ActiveLink({ activeClassName, className = '', ...props }: Props) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link {...props} className={tw(className, { [activeClassName]: isActive })}>
      {props.children}
    </Link>
  );
}
