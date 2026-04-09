import { useState } from "react";
import { Search } from "lucide-react";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { PostCard } from "@/components/dashboard/PostCard";
import { SkeletonGrid } from "@/components/dashboard/SkeletonCard";
import { usePageLoad } from "@/hooks/usePageLoad";
import { posts } from "@/lib/mock-data";

export default function LostFoundPage() {
  const loading = usePageLoad();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const lostFoundPosts = posts.filter((post) => {
    if (post.category !== "lost-found") return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase()) &&
        !post.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.lostFoundType && post.lostFoundType !== filters.lostFoundType) return false;
    return true;
  });

  return (
    <div className="space-y-12 py-8">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Lost & Found</h1>
        </div>
        <p className="text-lg text-muted-foreground">Help others find their lost items or report something you found on campus</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchBar placeholder="Search lost & found..." value={search} onChange={setSearch} className="flex-1" />
        <FilterPanel category="lost-found" onFiltersChange={setFilters} />
      </div>
      {loading ? (
        <SkeletonGrid count={6} />
      ) : lostFoundPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border/40 bg-muted/20 p-16 text-center">
          <Search className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-6 text-lg font-semibold">No items found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lostFoundPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}
