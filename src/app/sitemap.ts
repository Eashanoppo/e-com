import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/actions/products'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  
  const productUrls = products.map((p: any) => ({
    url: `https://ridy-heba.vercel.app/products/${p.id}`,
    lastModified: new Date(p.updated_at || p.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
 
  return [
    {
      url: 'https://ridy-heba.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://ridy-heba.vercel.app/products',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls,
  ]
}
