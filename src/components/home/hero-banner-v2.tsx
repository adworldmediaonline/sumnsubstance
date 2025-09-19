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
  ArrowRight,
  Heart,
  Leaf,
  Loader2,
  LogIn,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  User,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';

import { useState } from 'react';
import { authClient } from '../../lib/auth-client';
import { useRouter } from 'next/navigation';
import router from 'next/router';

interface HeroBannerV2Props {
  cartItemCount?: number;
}

export default function HeroBannerV2({ cartItemCount = 0 }: HeroBannerV2Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#8FBC8F] via-[#9ACD32] to-[#7CB342] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large organic background shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#6B8E23]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-[#228B22]/10 to-transparent rounded-tr-full"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-1/4 w-16 h-16 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-32 right-1/4 w-24 h-24 bg-white/15 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-[#FFD700]/30 rounded-full"></div>
      </div>

      {/* Enhanced Navigation Header */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Leaf className="w-6 h-6 text-[#228B22]" />
          </div>
          <span className="text-white font-bold text-xl">SumNSubstance</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={`${navigationMenuTriggerStyle()} text-white hover:text-[#FFD700] bg-transparent hover:bg-white/10 font-medium`}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/products"
                    className={`${navigationMenuTriggerStyle()} text-white hover:text-[#FFD700] bg-transparent hover:bg-white/10 font-medium`}
                  >
                    Products
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/categories"
                    className={`${navigationMenuTriggerStyle()} text-white hover:text-[#FFD700] bg-transparent hover:bg-white/10 font-medium`}
                  >
                    Categories
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    className={`${navigationMenuTriggerStyle()} text-white hover:text-[#FFD700] bg-transparent hover:bg-white/10 font-medium`}
                  >
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    className={`${navigationMenuTriggerStyle()} text-white hover:text-[#FFD700] bg-transparent hover:bg-white/10 font-medium`}
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
          {/* Search */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-white/10 text-white hover:text-[#FFD700] hidden sm:flex"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 hover:bg-white/10 text-white hover:text-[#FFD700]"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FFD700] text-[#228B22] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* User Account - Desktop */}
          {!isPending && session ? (
            <div className="hidden md:block">
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
                      {false && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1 w-fit">
                          Admin
                        </span>
                      )}
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

                  {false && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/admin" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

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
            </div>
          ) : (
            <Button
              asChild
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-medium"
            >
              <Link href="/sign-in">
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-white/10 text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-white/95 backdrop-blur-sm"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#228B22] rounded-full flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#228B22] font-bold text-lg">
                        SumNSubstance
                      </span>
                    </div>
                  </div>

                  {/* Mobile User Section */}

                  <div className="bg-[#228B22] text-white p-4 rounded-lg mb-6">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={''} alt={''} />
                        <AvatarFallback className="bg-white text-[#228B22] font-semibold">
                          {''}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{''}</p>
                        <p className="text-xs text-green-300 truncate">{''}</p>
                        {false && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Button
                      onClick={() => {}}
                      className="w-full bg-[#228B22] hover:bg-[#1e7a1e] text-white"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login / Sign Up
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 space-y-2">
                    <Link
                      href="/"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Products
                    </Link>
                    <Link
                      href="/categories"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Categories
                    </Link>
                    <Link
                      href="/about"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>

                    <>
                      <div className="border-t my-4"></div>
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserIcon className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/user/profile"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Account Settings
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Package className="w-4 h-4 mr-3" />
                        My Orders
                      </Link>

                      <Link
                        href="/dashboard/admin"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Admin Panel
                      </Link>
                    </>
                  </nav>

                  {/* Mobile Logout */}

                  <div className="border-t pt-4">
                    <Button
                      onClick={() => {}}
                      disabled={false}
                      variant="outline"
                      className="w-full text-red-600 border-red-600 hover:bg-red-50"
                    >
                      {false ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4 mr-2" />
                      )}
                      Log out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
              <span className="w-2 h-2 bg-[#FFD700] rounded-full"></span>
              100% BIO & ORGANIC PRODUCT
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Natural
                <br />
                <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                  Beauty
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-lg">
                Transform your skin with our premium collection of natural,
                organic skincare products designed for radiant, healthy beauty.
              </p>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-[#9ACD32] hover:bg-[#8FBC8F] text-white px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              DISCOVER MORE
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right Product Display */}
          <div className="relative flex justify-center items-center">
            {/* Main Product Container */}
            <div className="relative">
              {/* Large background circle - Made bigger */}
              <div className="w-[500px] h-[500px] bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden">
                {/* Product Image from Unsplash - Made bigger and better styled */}
                <div className="w-[450px] h-[450px] rounded-full overflow-hidden shadow-2xl relative border-4 border-white/30">
                  <img
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop&crop=center"
                    alt="Natural Skincare Product"
                    className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700"
                  />
                  {/* Enhanced overlay for better product presentation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#228B22]/20"></div>

                  {/* Product highlight ring */}
                  <div className="absolute inset-8 rounded-full border-2 border-white/40 animate-pulse"></div>
                  <div className="absolute inset-16 rounded-full border border-[#FFD700]/30"></div>
                </div>

                {/* Enhanced floating natural elements - Positioned for bigger circle */}
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-12 h-12 text-[#FFD700]" />
                </div>

                <div className="absolute -bottom-12 -right-12 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-[#FFD700]" />
                </div>

                {/* Enhanced orbiting elements */}
                <div className="absolute top-16 right-16 w-8 h-8 bg-[#FFD700] rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute bottom-16 left-16 w-6 h-6 bg-white/80 rounded-full shadow-lg"></div>
                <div className="absolute top-1/2 left-8 w-4 h-4 bg-[#FFD700]/60 rounded-full"></div>
                <div className="absolute top-1/2 right-8 w-4 h-4 bg-white/60 rounded-full"></div>
              </div>

              {/* Enhanced floating badge - Repositioned for bigger layout */}
              <div className="absolute top-20 -right-16 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#228B22] rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#228B22]">
                      100% Natural
                    </div>
                    <div className="text-xs text-gray-600">
                      Certified Organic
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional product quality indicators */}
              <div className="absolute bottom-20 -left-16 bg-gradient-to-r from-[#FFD700]/90 to-[#FFA500]/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-white font-bold text-lg">Premium</div>
                  <div className="text-white/90 text-xs">Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}
