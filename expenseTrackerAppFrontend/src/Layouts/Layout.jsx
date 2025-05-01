import React from 'react'
import { Outlet } from 'react-router';
import {useState} from 'react';
import SideBar from '../components/SideBar';
const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
    return (
      <div className="min-h-screen flex bg-gray-100 relative">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-35% bg-white shadow-lg transform
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            transition-transform duration-200 ease-in-out
            md:relative md:translate-x-0 md:block
          `}
        >
          <SideBar/>
        </aside>
  
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
  
        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full">
          {/* Mobile Header Toggle Button */}
          <div className="md:hidden bg-white shadow px-4 py-3">
            <button
              onClick={toggleSidebar}
              className="text-gray-800 font-medium"
            >
              ☰ Menu
            </button>
          </div>
  
          <main className="flex-1 p-4 md:p-6 max-w-7xl ">
            <Outlet />
          </main>
        </div>
      </div>
    );
  };
  
  export default Layout;