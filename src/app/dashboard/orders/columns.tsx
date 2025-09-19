'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MoreHorizontal, Eye, Package, Truck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import {
  getOrderStatusColor,
  getPaymentStatusColor,
} from '@/lib/utils/order-client-utils';
import type { SerializedOrder } from '@/types/order';

// Component to handle dropdown hydration
function OrderActionsDropdown({ order }: { order: SerializedOrder }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <Button variant="ghost" className="h-8 w-8 p-0" disabled>
        <span className="sr-only">Loading...</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/orders/${order.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/orders/${order.id}/edit`}>
            <Package className="mr-2 h-4 w-4" />
            Update Status
          </Link>
        </DropdownMenuItem>

        {order.status === 'CONFIRMED' && (
          <DropdownMenuItem>
            <Truck className="mr-2 h-4 w-4" />
            Mark as Shipped
          </DropdownMenuItem>
        )}

        <DropdownMenuItem>
          <Mail className="mr-2 h-4 w-4" />
          Send Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const orderColumns: ColumnDef<SerializedOrder>[] = [
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Number" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Link
          href={`/dashboard/orders/${order.id}`}
          className="font-medium hover:text-primary transition-colors"
        >
          #{order.orderNumber}
        </Link>
      );
    },
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      const customerName = order.user?.name || order.guestName || 'Guest';
      const customerEmail = order.user?.email || order.guestEmail || '';

      return (
        <div>
          <p className="font-medium">{customerName}</p>
          <p className="text-sm text-muted-foreground">{customerEmail}</p>
          {!order.userId && (
            <Badge variant="outline" className="text-xs mt-1">
              Guest
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return <Badge className={getOrderStatusColor(status)}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => {
      const paymentStatus = row.getValue('paymentStatus') as string;
      return (
        <Badge className={getPaymentStatusColor(paymentStatus)}>
          {paymentStatus}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const total = row.getValue('total') as number;
      return <span className="font-medium">₹{total.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
    cell: ({ row }) => {
      const method = row.getValue('paymentMethod') as string;
      return (
        <span className="capitalize">
          {method === 'razorpay'
            ? 'Online Payment'
            : method?.toUpperCase() || 'N/A'}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt') as string);
      return (
        <div>
          <p className="font-medium">{date.toLocaleDateString('en-IN')}</p>
          <p className="text-sm text-muted-foreground">
            {date.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'items',
    header: 'Items',
    cell: ({ row }) => {
      const items = row.getValue('items') as any[];
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      return (
        <div className="text-center">
          <p className="font-medium">{totalItems}</p>
          <p className="text-xs text-muted-foreground">
            {items.length} product{items.length !== 1 ? 's' : ''}
          </p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const order = row.original;
      return <OrderActionsDropdown order={order} />;
    },
  },
];
