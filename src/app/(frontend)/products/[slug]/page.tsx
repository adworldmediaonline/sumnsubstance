// import { getCurrentUser } from '@/lib/auth';
import ProductDetailsClient from './product-details-client';

export default async function ProductDetailsPage() {
  //   props: {
  //   params: Promise<{ slug: string }>;
  // }
  // Fetch user data on the server
  // const params = await props.params;
  const user = null;

  return <ProductDetailsClient user={user} />;
}
