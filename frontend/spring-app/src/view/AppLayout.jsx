/* eslint-disable react/prop-types */


import {
  Box,
  FormLabel,
  Input,
  Stack,
  Button,
  Select,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from '@chakra-ui/react';






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
