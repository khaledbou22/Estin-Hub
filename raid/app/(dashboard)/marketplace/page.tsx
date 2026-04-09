"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { FilterPanel } from "@/components/filter-panel"
import { PostCard } from "@/components/post-card"
import { posts } from "@/lib/mock-data"

export default function MarketplacePage() {
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState<Record<string, string>>({})

  const marketplacePosts = posts.filter((post) => {
    if (post.category !== "marketplace") return false
    
    if (search && !post.title.toLowerCase().includes(search.toLowerCase()) &&
        !post.description.toLowerCase().includes(search.toLowerCase())) {
      return false
    }

    if (filters.condition && post.condition !== filters.condition) {
      return false
    }

    if (filters.minPrice && post.price && post.price < parseInt(filters.minPrice)) {
      return false
    }
    if (filters.maxPrice && post.price && post.price > parseInt(filters.maxPrice)) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Marketplace</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Discover items for sale from students and buy what you need
          </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchBar
          placeholder="Search items..."
          value={search}
          onChange={setSearch}
          className="flex-1"
        />
        <FilterPanel category="marketplace" onFiltersChange={setFilters} />
      </div>

      {/* Results */}
      {marketplacePosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border/40 bg-muted/20 p-16 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-6 text-lg font-semibold">No items found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Try adjusting your search or filters to find items
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marketplacePosts.map((post, idx) => (
            <PostCard key={post.id} post={post} index={idx} />
          ))}
        </div>
      )}
    </div>
  )
}
