import { useState } from "react";
import { Check } from "lucide-react";

export interface ColorVariant {
  name: string;
  value: string; // hex color code
}

export interface SizeVariant {
  name: string;
  available: boolean;
}

interface VariantSelectorProps {
  colors?: ColorVariant[];
  sizes?: SizeVariant[];
  selectedColor?: string;
  selectedSize?: string;
  onColorChange?: (color: string) => void;
  onSizeChange?: (size: string) => void;
}

export default function VariantSelector({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: VariantSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Color Selector */}
      {colors && colors.length > 0 && (
        <div>
          <div className="text-sm font-medium text-primary mb-2">
            Color: <span className="text-[#7C818B]">{selectedColor || colors[0].name}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => onColorChange?.(color.name)}
                className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color.name || (!selectedColor && color === colors[0])
                    ? "border-[#11248F] ring-2 ring-[#11248F] ring-offset-2"
                    : "border-[#DADFE3] hover:border-[#11248F]"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {(selectedColor === color.name || (!selectedColor && color === colors[0])) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white drop-shadow-md" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {sizes && sizes.length > 0 && (
        <div>
          <div className="text-sm font-medium text-primary mb-2">
            Size: <span className="text-[#7C818B]">{selectedSize || sizes[0].name}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => size.available && onSizeChange?.(size.name)}
                disabled={!size.available}
                className={`px-4 py-2 text-sm border rounded-2xl transition-all ${
                  selectedSize === size.name || (!selectedSize && size === sizes[0])
                    ? "border-[#11248F] bg-primary text-white"
                    : size.available
                    ? "border-[#DADFE3] text-primary hover:border-[#11248F]"
                    : "border-[#DADFE3] text-[#DADFE3] cursor-not-allowed line-through"
                }`}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
