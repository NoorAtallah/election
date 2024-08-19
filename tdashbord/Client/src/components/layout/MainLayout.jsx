// MainLayout.jsx
import { Box } from '@mui/material';
import React, { useState } from 'react';
import Sidebar from '../common/Sidebar';
import DashboardPage from '../../pages/DashboardPage';
import NotificationsPage from '../../pages/NotificationsPage';
import ElectionList from '../../pages/ElectionList';

// استيراد باقي الصفحات هنا...

const sidebarWidth = 350;

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return <DashboardPage />;
      case 'notification':
        return <NotificationsPage />;
        case 'ElectionList':
         return <ElectionList/>;
      // أضف الحالات الأخرى هنا...
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Box display="flex">
      {/* sidebar */}
      <Sidebar sidebarWidth={sidebarWidth} activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* sidebar */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100vh",
          width: { sm: `calc(100% - ${sidebarWidth}px)` }
        }}
      >
        {renderContent()} {/* عرض المحتوى بناءً على التبويب النشط */}
      </Box>
    </Box>
  );
};

export default MainLayout;
