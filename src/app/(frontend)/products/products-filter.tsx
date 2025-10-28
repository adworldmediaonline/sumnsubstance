'use client';

import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useDebouncedCallback } from 'use-debounce';
import type { CategoryWithCount } from '@/server/queries/category';

interface ProductsFilterProps {
  categories: CategoryWithCount[];
  filters: {
    search: string;
    categories: string[];
    minPrice: number | null;
    maxPrice: number | null;
  };
  setFilters: (updates: {
    search?: string | null;
    categories?: string[] | null;
    minPrice?: number | null;
    maxPrice?: number | null;
  }) => void;
}

export default function ProductsFilter({
  categories,
  filters,
  setFilters,
}: ProductsFilterProps) {
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setFilters({ search: value || null });
  }, 500);

  const handlePriceChange = (values: number[]) => {
    setFilters({
      minPrice: values[0] || null,
      maxPrice: values[1] || null,
    });
  };

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    const current = filters.categories || [];
    setFilters({
      categories: checked
        ? [...current, categoryId]
        : current.filter((id) => id !== categoryId) || null,
    });
  };

  return (
    <div className="space-y-6 sticky top-4">
      <div>
        <h3 className="font-semibold mb-3">Search</h3>
        <Input
          type="search"
          placeholder="Search products..."
          defaultValue={filters.search}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.categories?.includes(category.id)}
                onCheckedChange={(checked) =>
                  handleCategoryToggle(category.id, checked as boolean)
                }
              />
              <Label htmlFor={category.id} className="cursor-pointer">
                {category.name} ({category._count.products})
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider
          min={0}
          max={2000}
          step={10}
          value={[filters.minPrice || 0, filters.maxPrice || 2000]}
          onValueChange={handlePriceChange}
        />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>${filters.minPrice || 0}</span>
          <span>${filters.maxPrice || 2000}</span>
        </div>
      </div>
    </div>
  );
}
