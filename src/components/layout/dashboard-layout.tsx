'use client';

import React from 'react';
import { AppSidebarAdmin } from '@/components/app-sidebar-admin';
import { AppSidebarUser } from '@/components/app-sidebar-user';
import DashboardHeader from './dashboard-header';
import PageHeader, { PageHeaderProps } from './page-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: 'admin' | 'user';
  headerProps?: {
    title?: string;
    description?: string;
    showSearch?: boolean;
    showNotifications?: boolean;
    showUserMenu?: boolean;
    customBreadcrumbs?: Array<{ label: string; href?: string }>;
    actions?: React.ReactNode;
    user?: {
      name: string;
      email: string;
      avatar?: string;
    };
  };
  pageHeaderProps?: PageHeaderProps;
  className?: string;
  contentClassName?: string;
}

export default function DashboardLayout({
  children,
  userRole = 'admin',
  headerProps,
  pageHeaderProps,
  className,
  contentClassName,
}: DashboardLayoutProps) {
  const SidebarComponent =
    userRole === 'admin' ? AppSidebarAdmin : AppSidebarUser;

  return (
    <SidebarProvider>
      <div className={cn('min-h-screen flex w-full', className)}>
        {/* Sidebar */}
        <SidebarComponent />

        {/* Main Content */}
        <SidebarInset className="flex-1 flex flex-col">
          {/* Header */}
          <DashboardHeader {...headerProps} />

          {/* Content Area */}
          <main className="flex-1 flex flex-col">
            <div className={cn('flex-1 p-4 lg:p-6', contentClassName)}>
              {/* Page Header */}
              {pageHeaderProps && (
                <div className="mb-6">
                  <PageHeader {...pageHeaderProps} />
                </div>
              )}

              {/* Page Content */}
              <div className="flex-1">{children}</div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

// Utility components for common layouts
export const DashboardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn('space-y-6', className)}>{children}</div>;

export const DashboardCard = ({
  children,
  className,
  title,
  description,
  actions,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}) => (
  <div className={cn('bg-card rounded-lg border', className)}>
    {(title || description || actions) && (
      <div className="border-b px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    )}
    <div className="p-4 lg:p-6">{children}</div>
  </div>
);

// Pre-configured layouts for common dashboard patterns
export const DataTableLayout = ({
  children,
  title,
  description,
  actions,
  stats,
  userRole = 'admin',
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  stats?: Array<{
    label: string;
    value: string | number;
    description?: string;
  }>;
  userRole?: 'admin' | 'user';
}) => (
  <DashboardLayout
    userRole={userRole}
    pageHeaderProps={{
      title,
      description,
      actions: actions ? { primary: actions } : undefined,
      stats,
    }}
  >
    <DashboardContainer>{children}</DashboardContainer>
  </DashboardLayout>
);

export const FormLayout = ({
  children,
  title,
  description,
  backButton,
  actions,
  userRole = 'admin',
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  backButton?: {
    href: string;
    label?: string;
  };
  actions?: React.ReactNode;
  userRole?: 'admin' | 'user';
}) => (
  <DashboardLayout
    userRole={userRole}
    pageHeaderProps={{
      title,
      description,
      backButton,
      actions: actions ? { primary: actions } : undefined,
    }}
  >
    <DashboardContainer>
      <DashboardCard>{children}</DashboardCard>
    </DashboardContainer>
  </DashboardLayout>
);
