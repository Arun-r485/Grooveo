"use client"

import { useState } from "react"
import { Search, Filter, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import ProductCard from "@/components/product-card"
import { allProducts } from "@/lib/products"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories, materials, and tags
  const categories = Array.from(new Set(allProducts.map((p) => p.category)))
  const materials = Array.from(new Set(allProducts.map((p) => p.material).filter(Boolean))) as string[]
  const allTags = Array.from(new Set(allProducts.flatMap((p) => p.tags || [])))

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesMaterial =
      selectedMaterials.length === 0 || (product.material && selectedMaterials.includes(product.material))
    const matchesTags =
      selectedTags.length === 0 || (product.tags && selectedTags.some((tag) => product.tags!.includes(tag)))

    let matchesPrice = true
    if (priceRange !== "all") {
      const price = product.price / 100 // Convert to rupees
      switch (priceRange) {
        case "under-10":
          matchesPrice = price < 10
          break
        case "10-20":
          matchesPrice = price >= 10 && price < 20
          break
        case "20-30":
          matchesPrice = price >= 20 && price < 30
          break
        case "over-30":
          matchesPrice = price >= 30
          break
      }
    }

    return matchesSearch && matchesCategory && matchesMaterial && matchesTags && matchesPrice
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, material])
    } else {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material))
    }
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tag])
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedMaterials([])
    setSelectedTags([])
    setPriceRange("all")
    setSortBy("featured")
  }

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedMaterials.length +
    selectedTags.length +
    (priceRange !== "all" ? 1 : 0)

  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="font-medium">Category</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h3 className="font-medium">Price Range</h3>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-10">Under ₹10</SelectItem>
            <SelectItem value="10-20">₹10 - ₹20</SelectItem>
            <SelectItem value="20-30">₹20 - ₹30</SelectItem>
            <SelectItem value="over-30">Over ₹30</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Material Filter */}
      <div className="space-y-3">
        <h3 className="font-medium">Material</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {materials.map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={`material-${material}${isMobile ? "-mobile" : ""}`}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
              />
              <Label htmlFor={`material-${material}${isMobile ? "-mobile" : ""}`} className="text-sm">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="space-y-3">
        <h3 className="font-medium">Features</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {allTags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={`tag-${tag}${isMobile ? "-mobile" : ""}`}
                checked={selectedTags.includes(tag)}
                onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
              />
              <Label htmlFor={`tag-${tag}${isMobile ? "-mobile" : ""}`} className="text-sm">
                {tag}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Eco-Friendly Packaging Products</h1>
          <p className="text-muted-foreground">
            Discover our complete range of sustainable packaging solutions for your business needs.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col gap-4">
          {/* Search and Sort Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="sm:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>Refine your search to find the perfect eco-friendly packaging.</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent isMobile={true} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Filter Toggle Button */}
          <div className="hidden sm:flex items-center justify-between">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <p className="text-sm text-muted-foreground">
              Showing {sortedProducts.length} of {allProducts.length} products
            </p>
          </div>

          {/* Collapsible Desktop Filters */}
          <div
            className={`hidden sm:block overflow-hidden transition-all duration-300 ease-in-out ${
              showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border rounded-lg p-6 bg-gray-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium">Category</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium">Price Range</h3>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-10">Under ₹10</SelectItem>
                      <SelectItem value="10-20">₹10 - ₹20</SelectItem>
                      <SelectItem value="20-30">₹20 - ₹30</SelectItem>
                      <SelectItem value="over-30">Over ₹30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Material Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium">Material</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {materials.slice(0, 4).map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material}-desktop`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                        />
                        <Label htmlFor={`material-${material}-desktop`} className="text-sm">
                          {material}
                        </Label>
                      </div>
                    ))}
                    {materials.length > 4 && (
                      <p className="text-xs text-muted-foreground">+{materials.length - 4} more materials</p>
                    )}
                  </div>
                </div>

                {/* Tags Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium">Features</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {allTags.slice(0, 4).map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}-desktop`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                        />
                        <Label htmlFor={`tag-${tag}-desktop`} className="text-sm">
                          {tag}
                        </Label>
                      </div>
                    ))}
                    {allTags.length > 4 && (
                      <p className="text-xs text-muted-foreground">+{allTags.length - 4} more features</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="mt-6 flex justify-center">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("all")} className="ml-1 hover:text-destructive">
                  ×
                </button>
              </Badge>
            )}
            {selectedMaterials.map((material) => (
              <Badge key={material} variant="secondary" className="gap-1">
                {material}
                <button onClick={() => handleMaterialChange(material, false)} className="ml-1 hover:text-destructive">
                  ×
                </button>
              </Badge>
            ))}
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button onClick={() => handleTagChange(tag, false)} className="ml-1 hover:text-destructive">
                  ×
                </button>
              </Badge>
            ))}
            {priceRange !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {priceRange === "under-10" && "Under ₹10"}
                {priceRange === "10-20" && "₹10-₹20"}
                {priceRange === "20-30" && "₹20-₹30"}
                {priceRange === "over-30" && "Over ₹30"}
                <button onClick={() => setPriceRange("all")} className="ml-1 hover:text-destructive">
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div>
          <div className="mb-4 sm:hidden">
            <p className="text-sm text-muted-foreground">
              Showing {sortedProducts.length} of {allProducts.length} products
            </p>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Filter className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
              </div>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
