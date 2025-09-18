'use client';

import { logoutUser } from '@/app/actions/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  BarChart3,
  Bell,
  HelpCircle,
  Home,
  LogOut,
  Moon,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  User,
  Users,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

interface DashboardHeaderProps {
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
}

// Page configurations for better breadcrumb generation
const pageConfigs: Record<string, { title: string; icon?: React.ElementType }> =
  {
    dashboard: { title: 'Dashboard', icon: BarChart3 },
    products: { title: 'Products', icon: Package },
    categories: { title: 'Categories', icon: Package },
    users: { title: 'Users', icon: Users },
    orders: { title: 'Orders', icon: ShoppingCart },
    carts: { title: 'Carts', icon: ShoppingCart },
    admin: { title: 'Admin', icon: Settings },
    new: { title: 'Create New', icon: Plus },
    edit: { title: 'Edit', icon: Settings },
  };

// Helper function to generate breadcrumbs from pathname
const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: Array<{ label: string; href?: string }> = [
    { label: 'Dashboard', href: '/dashboard' },
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Skip 'dashboard' segment as it's already in breadcrumbs
    if (segment === 'dashboard') return;

    // Get configuration for better naming
    const config = pageConfigs[segment];
    const label =
      config?.title ||
      segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
    });
  });

  return breadcrumbs;
};

export default function DashboardHeader({
  title,
  description,
  showSearch = true,
  showNotifications = true,
  showUserMenu = true,
  customBreadcrumbs,
  actions,
  user = {
    name: 'User',
    email: 'user@example.com',
  },
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const [notificationCount] = React.useState(3); // Mock notification count
  const [searchQuery, setSearchQuery] = React.useState('');

  const breadcrumbs = customBreadcrumbs || generateBreadcrumbs(pathname);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Search query:', searchQuery);
    }
  };

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const result = await logoutUser();
        if (result.success) {
          toast.success(result.message);
          // Use Next.js router for proper navigation
          router.push('/');
          router.refresh(); // Refresh to clear any cached user state
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Logout error:', error);
        toast.error('Failed to logout');
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="lg:hidden" />

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink asChild>
                        <Link
                          href={crumb.href}
                          className="flex items-center hover:text-foreground transition-colors"
                        >
                          {index === 0 && <Home className="w-4 h-4 mr-1" />}
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="font-semibold text-foreground">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Mobile Title */}
          <div className="md:hidden flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">
              {title || breadcrumbs[breadcrumbs.length - 1]?.label}
            </h1>
          </div>
        </div>

        <Separator orientation="vertical" className="h-6 hidden lg:block" />

        {/* Search */}
        {showSearch && (
          <div className="hidden lg:flex items-center flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, orders, users..."
                className="pl-10 pr-4 h-9 focus-visible:ring-1"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}

        {/* Mobile Search Trigger */}
        {showSearch && (
          <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
            <Search className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </Button>
        )}

        {/* Actions */}
        {actions && (
          <>
            <div className="flex items-center gap-2">{actions}</div>
            <Separator orientation="vertical" className="h-6" />
          </>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Settings className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          {showNotifications && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9"
                >
                  <Bell className="w-4 h-4" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </Badge>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="text-base">
                  Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-60 overflow-y-auto">
                  <div className="space-y-1">
                    <div className="p-3 hover:bg-muted/50 rounded-sm cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1 space-y-1">
                          <div className="font-medium text-sm">
                            New order received
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Order #ORD-001234 needs processing
                          </div>
                          <div className="text-muted-foreground text-xs">
                            2 minutes ago
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/50 rounded-sm cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                        <div className="flex-1 space-y-1">
                          <div className="font-medium text-sm">
                            Low stock alert
                          </div>
                          <div className="text-muted-foreground text-xs">
                            5 products are running low on inventory
                          </div>
                          <div className="text-muted-foreground text-xs">
                            1 hour ago
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/50 rounded-sm cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1 space-y-1">
                          <div className="font-medium text-sm">
                            System update completed
                          </div>
                          <div className="text-muted-foreground text-xs">
                            New features and improvements are now available
                          </div>
                          <div className="text-muted-foreground text-xs">
                            3 hours ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center justify-center">
                  <Bell className="mr-2 h-4 w-4" />
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* User Menu */}
          {showUserMenu && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push('/dashboard/user/profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/dashboard/user/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isPending}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isPending ? 'Logging out...' : 'Log out'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Page Title Section (below header) */}
      {(title || description) && (
        <div className="border-b bg-muted/10">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                {title && (
                  <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                )}
                {description && (
                  <p className="text-muted-foreground max-w-2xl">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
