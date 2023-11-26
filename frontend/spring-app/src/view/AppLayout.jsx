/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import SidebarWithHeader from './SidebarWithHeader';

function AppLayout({ currentUser}) {
  return (
    <>
      <SidebarWithHeader currentUser={currentUser}>
        <main>
          <Outlet />
        </main>
      </SidebarWithHeader>
    </>
  );
}

export default AppLayout;
