import { Check } from 'lucide-react';
import { Link } from 'wouter';

interface LegalSidebarProps {
  activePage: 'terms-of-use' | 'privacy-policy' | 'legal';
}

export default function LegalSidebar({ activePage }: LegalSidebarProps) {
  const legalPages = [
    { id: 'terms-of-use', label: 'Terms of Use', href: '/legal/terms-of-use' },
    { id: 'privacy-policy', label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { id: 'money-back', label: 'Money Back Policy', href: '/legal' },
    { id: 'accessibility', label: 'Accessibility', href: '/legal' },
    { id: 'cookie-policy', label: 'Cookie policy', href: '/legal' },
    { id: 'subscription', label: 'Subscription Terms', href: '/legal' },
    { id: 'security', label: 'Security overview', href: '/legal' },
    { id: 'license', label: 'License Agreement', href: '/legal' },
  ];

  return (
    <aside className="w-full lg:w-64 lg:sticky lg:top-24 lg:self-start">
      <nav className="bg-white border border-gray-200 rounded-2xl  p-4">
        <ul className="space-y-2">
          {legalPages.map((page) => {
            const isActive = page.id === activePage || (page.id === 'money-back' && activePage === 'legal');
            return (
              <li key={page.id}>
                <Link href={page.href}>
                  <a
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl  transition-colors ${
                      isActive
                        ? 'bg-gray-50 text-primary font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    {isActive && (
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    )}
                    <span className={isActive ? '' : 'ml-7'}>{page.label}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
