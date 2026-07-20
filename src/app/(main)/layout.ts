// components/MainLayout.ts

import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import React from 'react';
// import { Toaster } from 'react-hot-toast';
// import { Toaster } from 'react-hot-toast';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// ১. children-এর জন্য প্রফেশনাল TypeScript ইন্টারফেস তৈরি করা
interface MainLayoutProps {
  children: React.ReactNode;
}

// ২. কম্পোনেন্ট এবং তার রিটার্ন টাইপ React.ReactElement সেট করা
const MainLayout = ({ children }: MainLayoutProps): React.ReactElement => {
  return React.createElement(
    'div',
    null,
    React.createElement(Navbar, null),
    // React.createElement(Toaster, { position: 'top-center' }),
    React.createElement('main', null, children),
    React.createElement(Footer, null)
  );
};

export default MainLayout;