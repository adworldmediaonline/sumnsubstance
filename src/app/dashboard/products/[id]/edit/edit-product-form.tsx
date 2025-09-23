'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { updateProduct } from '@/app/actions/product';
import { updateProductSchema } from '@/lib/validations/product';
import { toast } from 'sonner';
import slugify from 'slugify';
import type { SerializedProductWithCategory } from '@/server/queries/product';
import type { CategoryWithCount } from '@/server/queries/category';
import { RichTextEditor } from '../../../../../components/rich-text-editor';
import { ImageUpload } from '@/components/ui/image-upload';
type FormData = z.infer<typeof updateProductSchema>;

interface EditProductFormProps {
  product: SerializedProductWithCategory;
  categories: CategoryWithCount[];
}

export function EditProductForm({ product, categories }: EditProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      excerpt: product.excerpt || '',
      description: product.description || '',
      mainImage: product.mainImage,
      additionalImages: product.additionalImages,
    },
  });

  const watchedName = form.watch('name');
  const previewSlug = watchedName
    ? slugify(watchedName, { lower: true, strict: true })
    : '';
  const hasNameChanged = watchedName !== product.name;

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    try {
      const result = await updateProduct(data);

      if (result.success) {
        toast.success('Product updated successfully!');
        router.push('/dashboard/products');
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product name"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                <span className="block space-y-1">
                  <span className="block">
                    Current slug:{' '}
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">
                      /{product.slug}
                    </code>
                  </span>
                  {hasNameChanged && previewSlug && (
                    <span className="block">
                      New slug will be:{' '}
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">
                        /{previewSlug}
                      </code>
                    </span>
                  )}
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Excerpt</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a short description (optional)"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Brief description for product cards and listings (max 300
                characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <RichTextEditor
                  {...field}
                  placeholder="Write your blog content here..."
                  size="lg"
                />
              </FormControl>
              <FormDescription>
                Enter the description of the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...field}
                  onChange={e =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Enter the price in dollars (e.g., 29.99)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category._count.products} product
                      {category._count.products !== 1 ? 's' : ''})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category this product belongs to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Main Image Upload */}
        <FormField
          control={form.control}
          name="mainImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Image</FormLabel>
              <FormControl>
                <ImageUpload
                  variant="single"
                  value={field.value}
                  onChange={field.onChange}
                  maxFileSize={5 * 1024 * 1024} // 5MB
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Upload the primary image for this product (max 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Images Upload */}
        <FormField
          control={form.control}
          name="additionalImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Images</FormLabel>
              <FormControl>
                <ImageUpload
                  variant="multiple"
                  limit={10}
                  value={field.value || []}
                  onChange={field.onChange}
                  maxFileSize={5 * 1024 * 1024} // 5MB
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Upload additional product images (max 10 images, 5MB each)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Product'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/products')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
