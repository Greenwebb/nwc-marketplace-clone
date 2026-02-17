import { Home, Grid3x3, ShoppingCart, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';

interface BottomNavProps {
  cartItemCount?: number;
}

export function BottomNav({ cartItemCount = 0 }: BottomNavProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Grid3x3, label: 'Shop', path: '/shop' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: cartItemCount },
    { icon: User, label: 'Account', path: '/dashboard' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary text-white z-50 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <a className="flex flex-col items-center justify-center gap-1 px-4 py-2 relative">
                <div className="relative">
                  <Icon 
                    className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/70'}`} 
                  />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#D8125D] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs ${isActive ? 'text-white font-medium' : 'text-white/70'}`}>
                  {item.label}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
