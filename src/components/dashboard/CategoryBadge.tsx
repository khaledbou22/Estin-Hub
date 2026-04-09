import { cn } from "@/lib/utils";
import { type Category, categoryColors, categoryLabels } from "@/lib/mock-data";

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const customColors: Record<Category, string> = {
    services: "bg-[#EEF2FF] text-[#6C63FF]",
    marketplace: "bg-[#F0FDF4] text-[#16A34A]",
    transport: "bg-[#FFF7ED] text-[#EA580C]",
    "lost-found": "bg-[#FEF2F2] text-[#DC2626]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-[10px] py-[3px] text-[10px] font-bold uppercase tracking-[0.05em]",
        customColors[category] ?? categoryColors[category],
        className,
      )}
    >
      {categoryLabels[category]}
    </span>
  );
}

