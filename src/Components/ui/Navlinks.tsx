import { NavLinkItem } from '@/types/navbar';
import Link from 'next/link';


interface NavLinksProps {
  links: NavLinkItem[];
  pathname: string;
  onClick?: () => void;
}

export const NavLinks = ({ links, pathname, onClick }: NavLinksProps) => {
  return (
    <nav className="flex flex-col lg:flex-row lg:items-center gap-1">
      {links.map((link) => {
        const isActive = pathname === link.path || pathname.startsWith(link.path + '/');
        const Icon = link.icon;
        
        return (
          <Link
            key={link.path}
            href={link.path}
            onClick={onClick}
            className={`
              flex items-center gap-2 px-4 py-1.5 lg:py-1.5 rounded-lg text-sm font-bold transition-all
              ${isActive
                ? 'bg-zinc-900 text-white shadow-md shadow-zinc-900/10'
                : 'text-zinc-800 hover:text-orange-600 hover:bg-zinc-900/5'
              }
            `}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-zinc-700'}`} />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};