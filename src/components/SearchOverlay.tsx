import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col">
      {/* Search Input Area */}
      <div className="p-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl  border-gray-300 pr-12 text-base focus-visible:ring-[#11248F]/50"
            autoFocus
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Results Area - Empty for now */}
      <div className="flex-1 overflow-y-auto">
        {/* Future: Add search suggestions, recent searches, popular products */}
      </div>

      {/* Close Button at Bottom */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 py-3 text-gray-700 font-medium text-base"
        >
          <X className="w-5 h-5" />
          Close
        </button>
      </div>
    </div>
  );
}
