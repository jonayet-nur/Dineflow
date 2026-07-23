// 'use client'
// import DashboardNavbar from '@/Components/dashboard/DashboardNavbar';
// import DashboardSidebar from '@/Components/dashboard/DashboardSidebar';
// import React, { ReactNode, useState } from 'react';
// // import DashboardSidebar from './DashboardSidebar';
// // import DashboardNavbar from './DashboardNavbar';

// interface DashboardMainLayoutProps {
//   children: ReactNode;
// }

// const DashboardMainLayout = ({ children }: DashboardMainLayoutProps): React.ReactElement => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const toggleMobileSidebar = () => {
//     setIsMobileSidebarOpen(!isMobileSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-50">
//       {/* Sidebar */}
//       <DashboardSidebar 
//         isOpen={isSidebarOpen} 
//         isMobileOpen={isMobileSidebarOpen}
//         toggleMobile={toggleMobileSidebar}
//       />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col min-w-0">
//         {/* Navbar */}
//         <DashboardNavbar 
//           toggleSidebar={toggleSidebar} 
//           toggleMobileSidebar={toggleMobileSidebar}
//           isSidebarOpen={isSidebarOpen}
//         />

//         {/* Dynamic Page Content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
//           <div className="max-w-7xl mx-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardMainLayout;


'use client'

import DashboardNavbar from '@/Components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/Components/dashboard/DashboardSidebar';
import React, { ReactNode, useState } from 'react';


interface DashboardMainLayoutProps {
  children: ReactNode;
}

const DashboardMainLayout = ({ children }: DashboardMainLayoutProps): React.ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        isMobileOpen={isMobileSidebarOpen}
        toggleMobile={toggleMobileSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar 
          toggleSidebar={toggleSidebar} 
          toggleMobileSidebar={toggleMobileSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardMainLayout;