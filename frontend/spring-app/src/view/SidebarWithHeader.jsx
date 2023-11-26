/* eslint-disable react/prop-types */
'use client';

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
} from '@chakra-ui/react';
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiUserPlus,
  FiFilePlus,
} from 'react-icons/fi';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../components/Auth';
import { useContext } from 'react';
import { ModalLoginForm } from './ModalLoginForm';

const LinkItems = [
  { name: 'Home', icon: FiHome, link: '/' },
  { name: 'All User', icon: FiUser, link: '/users' },
  { name: 'Upload file', icon: FiFilePlus, link: '/upload' },
  { name: 'Add User', icon: FiUserPlus, link: '/create-users' },
  // { name: 'Settings', icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      // height="100vh"
      top="0"
      pos="fixed"
      zIndex={21}
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          <Link to={link.link}>{link.name}</Link>
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, currentUser, ...rest }) => {
  // const { isOpen, onClose, onOpen } = useDisclosure();

  const { logoutUser } = useContext(AuthContext);
  const handleLogout = async () => {
    const logout = await logoutUser();
    if (logout) {
      window.location.reload();
    }
  };

  const handleRoleAdmin = () => {
    // if role is admin, return true else return false
    const lowercaseRoles = currentUser
      ? currentUser.roles?.map((role) => role.toLowerCase())
      : [];
    if (
      lowercaseRoles.includes('admin') ||
      lowercaseRoles.includes('role_admin')
    ) {
      return true;
    }
    return false;
  };
  return (
    <Flex
      // ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      top="0"
      pos="fixed"
      w="full"
      zIndex={20}
      height="20"
      alignItems="center"
      bg={useColorModeValue('gray.50', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {currentUser?.name ? currentUser.name : 'username'}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {handleRoleAdmin() ? 'Admin' : 'User'}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              {currentUser ? (
                <MenuItem
                  onClick={handleLogout}
                  m={'0'}
                  p={'0 10'}
                  fontWeight={'bold'}
                >
                  Sign out
                </MenuItem>
              ) : (
                <MenuItem m={'0'} p={'0 10'} fontWeight={'bold'}>
                  <Link to="/login" onClick={onOpen}>
                    Login
                  </Link>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ currentUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box h={'100vh'} w={'full'}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav currentUser={currentUser} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
        {/* {children} */}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
