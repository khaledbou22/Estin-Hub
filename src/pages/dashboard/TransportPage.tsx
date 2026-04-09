import { useState } from "react";
import { Car } from "lucide-react";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { PostCard } from "@/components/dashboard/PostCard";
import { SkeletonGrid } from "@/components/dashboard/SkeletonCard";
import { usePageLoad } from "@/hooks/usePageLoad";
import { posts } from "@/lib/mock-data";

export default function TransportPage() {
  const loading = usePageLoad();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const transportPosts = posts.filter((post) => {
    if (post.category !== "transport") return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase()) &&
        !post.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.fromCity && post.fromCity !== filters.fromCity) return false;
    if (filters.toCity && post.toCity !== filters.toCity) return false;
    if (filters.date && post.date !== filters.date) return false;
    if (filters.minSeats && post.seatsAvailable && post.seatsAvailable < parseInt(filters.minSeats)) return false;
    return true;
  });

  return (
    <div className="space-y-12 py-8">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Car className="h-5 w-5" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Transport</h1>
        </div>
        <p className="text-lg text-muted-foreground">Find and share rides between cities with fellow students</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchBar placeholder="Search transport..." value={search} onChange={setSearch} className="flex-1" />
        <FilterPanel category="transport" onFiltersChange={setFilters} />
      </div>
      {loading ? (
        <SkeletonGrid count={6} />
      ) : transportPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border/40 bg-muted/20 p-16 text-center">
          <Car className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-6 text-lg font-semibold">No rides found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {transportPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}
