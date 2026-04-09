import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cities, serviceTypes } from "@/lib/mock-data";
import type { Category } from "@/lib/mock-data";

interface FilterPanelProps {
  category: Category;
  onFiltersChange?: (filters: Record<string, string>) => void;
}

export function FilterPanel({ category, onFiltersChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    if (!value || value === "all") delete newFilters[key];
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange?.({});
  };

  const hasFilters = Object.keys(filters).length > 0;

  const renderFilters = () => {
    switch (category) {
      case "services":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select value={filters.serviceType || ""} onValueChange={(v) => updateFilter("serviceType", v)}>
                <SelectTrigger><SelectValue placeholder="All types" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {serviceTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Max Price (DZD)</Label>
              <Input type="number" placeholder="Enter max price" value={filters.maxPrice || ""} onChange={(e) => updateFilter("maxPrice", e.target.value)} />
            </div>
          </div>
        );
      case "marketplace":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Condition</Label>
              <Select value={filters.condition || ""} onValueChange={(v) => updateFilter("condition", v)}>
                <SelectTrigger><SelectValue placeholder="Any condition" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any condition</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like-new">Like New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Min Price</Label>
                <Input type="number" placeholder="Min" value={filters.minPrice || ""} onChange={(e) => updateFilter("minPrice", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Max Price</Label>
                <Input type="number" placeholder="Max" value={filters.maxPrice || ""} onChange={(e) => updateFilter("maxPrice", e.target.value)} />
              </div>
            </div>
          </div>
        );
      case "transport":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>From City</Label>
              <Select value={filters.fromCity || ""} onValueChange={(v) => updateFilter("fromCity", v)}>
                <SelectTrigger><SelectValue placeholder="Any city" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any city</SelectItem>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>To City</Label>
              <Select value={filters.toCity || ""} onValueChange={(v) => updateFilter("toCity", v)}>
                <SelectTrigger><SelectValue placeholder="Any city" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any city</SelectItem>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" value={filters.date || ""} onChange={(e) => updateFilter("date", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Min Available Seats</Label>
              <Input type="number" min="1" placeholder="Any" value={filters.minSeats || ""} onChange={(e) => updateFilter("minSeats", e.target.value)} />
            </div>
          </div>
        );
      case "lost-found":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={filters.lostFoundType || ""} onValueChange={(v) => updateFilter("lostFoundType", v)}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="found">Found</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {hasFilters && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {Object.keys(filters).length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Narrow down your search results</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {renderFilters()}
          {hasFilters && (
            <Button variant="ghost" className="mt-4 w-full gap-2" onClick={clearFilters}>
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
