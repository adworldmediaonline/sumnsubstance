'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Heart,
  Leaf,
  LogOut,
  Menu,
  Package,
  Settings,
  User,
  UserIcon
} from 'lucide-react';
import Link from 'next/link';

import { AuthDialog } from '@/components/auth/auth-dialog';
import { CartDropdown } from '@/components/cart/cart-dropdown';
import { DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function SiteHeaderPublic() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    // Check if we're on the home page (which has a hero banner)
    const currentPath = window.location.pathname;
    const isHome = currentPath === '/';
    setIsHomePage(isHome);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Set initial scroll state based on page type
    if (!isHome) {
      // On non-home pages, start with scrolled state (dark text on white background)
      setIsScrolled(true);
    } else {
      // On home page, start with non-scrolled state (white text on hero banner)
      setIsScrolled(false);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-300 ease-in-out ${
      isHomePage
        ? (isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-6')
        : 'bg-white/95 backdrop-blur-md shadow-lg py-3'
    }`}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className={`bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isHomePage
            ? (isScrolled ? 'w-10 h-10' : 'w-12 h-12')
            : 'w-10 h-10'
        }`}>
          <Leaf className={`text-[#228B22] transition-all duration-300 ${
            isHomePage
              ? (isScrolled ? 'w-5 h-5' : 'w-6 h-6')
              : 'w-5 h-5'
          }`} />
        </div>
        <span className={`font-bold text-xl transition-colors duration-300 ${
          isHomePage
            ? (isScrolled ? 'text-[#228B22]' : 'text-white')
            : 'text-[#228B22]'
        }`}>SumNSubstance</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center">
        <NavigationMenu>
          <NavigationMenuList className="space-x-1">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium ${
                    isHomePage
                      ? (isScrolled
                          ? 'text-gray-700 hover:text-[#228B22] bg-transparent hover:bg-gray-100'
                          : 'text-white hover:text-[#FFD700] bg-transparent hover:bg-white/10')
                      : 'text-gray-700 hover:text-[#228B22] bg-transparent hover:bg-gray-100'
                  }`}
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/products"
                  className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium ${
                    isHomePage
                      ? (isScrolled
                          ? 'text-gray-700 hover:text-[#228B22] bg-transparent hover:bg-gray-100'
                          : 'text-white hover:text-[#FFD700] bg-transparent hover:bg-white/10')
                      : 'text-gray-700 hover:text-[#228B22] bg-transparent hover:bg-gray-100'
                  }`}
                >
                  Products
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/categories"
                  className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium ${
                    isHomePage
                      ? (isScrolled
                          ? 'text-gray-700 hover:text-[#228B22] bg-transparent hover:bg-gray-100'
                          : 'text-white hover:text-[#FFD700] bg-transparent hover:bg-white/10')
                      : 'text-gray-700 hover:text-[#228B22] bg-transparent hover:bg-gray-100'
                  }`}
                >
                  Categories
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium ${
                    isHomePage
                      ? (isScrolled
                          ? 'text-gray-700 hover:text-[#228B22] bg-transparent hover:bg-gray-100'
                          : 'text-white hover:text-[#FFD700] bg-transparent hover:bg-white/10')
                      : 'text-gray-700 hover:text-[#228B22] bg-transparent hover:bg-gray-100'
                  }`}
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium ${
                    isHomePage
                      ? (isScrolled
                          ? 'text-gray-700 hover:text-[#228B22] bg-transparent hover:bg-gray-100'
                          : 'text-white hover:text-[#FFD700] bg-transparent hover:bg-white/10')
                      : 'text-gray-700 hover:text-[#228B22] bg-transparent hover:bg-gray-100'
                  }`}
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Cart */}
        <CartDropdown isScrolled={isScrolled} />

        {/* User Account - Desktop */}
        {!isPending && session ? (
          <div className="hidden md:block">{isMounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full hover:bg-white/10"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={session.user.image ?? ''} alt={''} />
                    <AvatarFallback className="bg-white text-[#228B22] font-semibold">
                      {session.user.initials ?? ''}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 bg-white/95 backdrop-blur-sm"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/dashboard/" className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/user/profile"
                    className="cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={() => {
                    authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push('/');
                        },
                      },
                    });
                  }}
                  disabled={false}
                >
                  <LogOut className="mr-2 h-4 w-4" /> <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}</div>
        ) : (
          isMounted && (
            <AuthDialog
              trigger={
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`relative p-2 rounded-full transition-all duration-300 ${
                      isHomePage
                        ? (isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10')
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isHomePage
                        ? (isScrolled ? 'bg-[#228B22] text-white' : 'bg-white text-[#228B22]')
                        : 'bg-[#228B22] text-white'
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                  </Button>
                </DialogTrigger>
              }
            />
          )
        )}

        {/* Mobile Menu */}
        <div className="md:hidden">
          {isMounted && (
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 transition-colors duration-300 ${
                  isHomePage
                    ? (isScrolled ? 'text-[#228B22] hover:bg-gray-100' : 'text-white hover:bg-white/10')
                    : 'text-[#228B22] hover:bg-gray-100'
                }`}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-gradient-to-br from-[#228B22] to-[#7CB342]"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <Leaf className="w-6 h-6 text-[#228B22]" />
                  </div>
                  <span className="font-bold text-xl text-white">SumNSubstance</span>
                </div>

                {/* User Info (Mobile) */}
                {session && (
                  <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={session.user.image ?? ''} alt={''} />
                        <AvatarFallback className="bg-white text-[#228B22] font-semibold">
                          {session.user.initials ?? ''}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{session.user.name}</p>
                        <p className="text-white/70 text-sm">{session.user.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <nav className="flex-1 space-y-2">
                  <Link
                    href="/"
                    className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Home</span>
                  </Link>
                  <Link
                    href="/products"
                    className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Products</span>
                  </Link>
                  <Link
                    href="/categories"
                    className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Categories</span>
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium">About</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Contact</span>
                  </Link>

                  <div className="my-4 h-px bg-white/20" />

                  {session && (
                    <>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserIcon className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Package className="w-5 h-5" />
                        <span className="font-medium">My Orders</span>
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Heart className="w-5 h-5" />
                        <span className="font-medium">Wishlist</span>
                      </Link>
                    </>
                  )}
                </nav>

                {/* Mobile Bottom Actions */}
                <div className="pt-4 border-t border-white/20">
                  {session ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-red-500/20 hover:text-white"
                      onClick={() => {
                        authClient.signOut({
                          fetchOptions: {
                            onSuccess: () => {
                              setIsMobileMenuOpen(false);
                              router.push('/');
                            },
                          },
                        });
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      <span className="font-medium">Log out</span>
                    </Button>
                  ) : (
                    <AuthDialog
                      trigger={
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-white hover:bg-white/10"
                          >
                            <User className="mr-2 h-5 w-5" />
                            <span className="font-medium">Sign In</span>
                          </Button>
                        </DialogTrigger>
                      }
                    />
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
}

