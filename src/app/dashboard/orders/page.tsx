import { Metadata } from 'next';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table/data-table';
import { orderColumns } from './columns';
import { getOrders } from '@/server/queries/order';
import { OrderAnalytics } from '@/components/orders/order-analytics';

export const metadata: Metadata = {
  title: 'Orders | Dashboard',
  description: 'Manage and track customer orders',
};

interface OrdersPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    status?: string;
    paymentStatus?: string;
    search?: string;
  };
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const page = parseInt(searchParams.page || '1');
  const limit = parseInt(searchParams.limit || '10');
  const status = searchParams.status?.split(',').filter(Boolean);
  const paymentStatus = searchParams.paymentStatus?.split(',').filter(Boolean);
  const search = searchParams.search;

  const { orders, totalCount, analytics } = await getOrders({
    page,
    limit,
    status,
    paymentStatus,
    search,
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track customer orders and payments
        </p>
      </div>

      {/* Analytics Overview */}
      <Suspense fallback={<div>Loading analytics...</div>}>
        <OrderAnalytics analytics={analytics} />
      </Suspense>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={orderColumns}
            data={orders}
            searchKey="orderNumber"
            searchPlaceholder="Search orders..."
            totalCount={totalCount}
            pageSize={limit}
            currentPage={page}
          />
        </CardContent>
      </Card>
    </div>
  );
}
