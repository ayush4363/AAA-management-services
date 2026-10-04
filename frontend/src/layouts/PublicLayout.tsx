import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FAF9F5] text-[#141518] selection:bg-[#F8E5DF] m-0 p-0">
      <Navbar />
      <main className="flex-1 flex flex-col m-0 p-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
