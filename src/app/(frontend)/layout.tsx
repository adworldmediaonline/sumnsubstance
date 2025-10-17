'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteHeaderPublic from '@/components/layout/site-header-public';
import SiteHeaderStandard from '@/components/layout/site-header-standard';
import Footer from '@/components/layout/footer';

export default function FrontendLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(pathname === '/');
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      {isHomePage ? <SiteHeaderPublic /> : <SiteHeaderStandard />}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
