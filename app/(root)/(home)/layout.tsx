import { Metadata } from 'next';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'YOOM',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="relative">
      <Navbar />

      <div className="flex">
        <Sidebar />
        
        <section className="flex bg-dark-1 min-h-screen flex-1 flex-col pt-24">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
