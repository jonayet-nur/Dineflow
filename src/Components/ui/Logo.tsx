import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-bold shrink-0 group">
      <div className="p-2 bg-orange-600/10 rounded-xl transition-all group-hover:bg-orange-600/20 group-hover:scale-105">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="2.5" 
          stroke="currentColor" 
          className="w-5 h-5 text-orange-600"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9.813 15.904L9 21l8.982-11.795H14.19C15.538 4.042 16.5 2 16.5 2L7.5 13.795h5.313L9.813 15.904z" 
          />
        </svg>
      </div>
      <span className="tracking-tight font-black text-orange-600">
        Dine<span className="text-orange-600">flow</span>
      </span>
    </Link>
  );
};