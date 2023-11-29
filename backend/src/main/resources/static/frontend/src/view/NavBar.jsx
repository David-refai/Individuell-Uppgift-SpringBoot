// 'use client';

// import {
//   Box,
//   Flex,
//   IconButton,
//   Button,
//   Stack,
//   Collapse,
//   useColorModeValue,
//   useDisclosure,
//   HStack,
// } from '@chakra-ui/react';
// import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
// import { Link } from 'react-router-dom';
// import { useContext, useEffect } from 'react';
// import { useState } from 'react';
// import { AuthContext } from '../components/Auth';
// import UpdateForm from './UpdateForm';

// export default function NavBar() {
//    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
//   //  use <AuthContext.Provider> to wrap <NavBar> in <AppLayout> in <App>
//   const { user: getUser, logoutUser } = useContext(AuthContext);
//   const [user, setCurrentUser] = useState(getUser);

//   const handleLogout = () => {
//     const logout = logoutUser();
//     if (logout) {
//       setCurrentUser(null);
//     }
//   };

//   useEffect(() => {
//     const user = getUser;
//     if (user) {
//       setCurrentUser(user);
//     }
//   }, [getUser]);

//   const handleRoleAdmin = () => {
//     // if role is admin, return true else return false
//     const lowercaseRoles = user
//       ? user.roles?.map((role) => role.toLowerCase())
//       : [];
//     if (
//       lowercaseRoles.includes('admin') ||
//       lowercaseRoles.includes('role_admin')
//     ) {
//       return true;
//     }
//     return false;
//   };

//   return (
//     <Box>
//       <Flex
//         bg={useColorModeValue('black', 'white')}
//         color={useColorModeValue('black', 'white')}
//         minH={'60px'}
//         py={{ base: 2 }}
//         px={{ base: 4 }}
//         borderBottom={1}
//         borderStyle={'solid'}
//         borderColor={useColorModeValue('gray.200', 'gray.900')}
//         align={'center'}
//       >
//         <Flex
//           flex={{ base: 1, md: 'auto' }}
//           ml={{ base: -2 }}
//           display={{ base: 'flex', md: 'none' }}
//         >
//           <IconButton
//             onClick={onToggle}
//             icon={
//               isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
//             }
//             variant={'ghost'}
//             aria-label={'Toggle Navigation'}
//           />
//         </Flex>
//         <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
//           <p
//             style={{ cursor: 'pointer' }}
//             // textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
//             // fontFamily={'heading'}
//             // color={useColorModeValue('gray.800', 'white')}
//           ></p>
//           <span
//             style={{
//               cursor: 'pointer',
//               position: 'absolute',
//               left: '10%',
//               transform: 'translate(-50%, -50%)',
//               backgroundColor: 'black',
//               color: 'white',
//               padding: '10px 20px',
//               borderRadius: '10px',
//               fontWeight: 'bold',
//             }}
//           >
//             <Link to="/">Home</Link>
//           </span>
//           <Flex display={{ base: 'none', md: 'flex' }} ml={10}></Flex>
//         </Flex>
//         {user ? (
//           <HStack
//             flex={{ base: 1, md: 0 }}
//             justify={'flex-end'}
//             direction={'row'}
//             spacing={6}
//           >
//             <span
//               style={{
//                 color: 'black',
//                 fontWeight: 'bold',
//                 textDecoration: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '10px',
//                 backgroundColor: 'pink',
//               }}
//             >
//               {user ? (
//                 <Link to={`/update/${user.id}`}>{user.name}</Link>
//               ) : (
//                 ''
//               )}
//             </span>
//             {/* <Button
//               display={{ base: 'none', md: 'inline-flex' }}
//               fontSize={'sm'}
//               fontWeight={600}
//               // color={'white'}
//               shadow={'base'}
//               bg={'pink.400'}
//               _hover={{
//                 bg: 'black.300',
//               }}
//               leftIcon={<AddIcon />}
//               colorScheme="teal"
//               onClick={onOpen}
//             >
//               Create user
//             </Button> */}
//             {/* <UpdateForm /> */}
//             <Button
//               // as={'a'}
//               display={{ base: 'none', md: 'inline-flex' }}
//               fontSize={'sm'}
//               fontWeight={600}
//               // color={'white'}
//               shadow={'base'}
//               bg={'pink.400'}
//               _hover={{
//                 bg: 'black.300',
//               }}
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>

//             {handleRoleAdmin() && (
//               <Button
//                 display={{ base: 'none', md: 'inline-flex' }}
//                 fontSize={'sm'}
//                 fontWeight={600}
//                 color={'white'}
//                 bg={'pink.400'}
//                 _hover={{
//                   bg: 'pink.300',
//                 }}
//               >
//                 <Link to="/register">Add User</Link>
//               </Button>
//             )}
//           </HStack>
//         ) : (
//           <Stack
//             flex={{ base: 1, md: 0 }}
//             justify={'flex-end'}
//             direction={'row'}
//             spacing={6}
//           >
//             <Button fontSize={'sm'} fontWeight={400} variant={'link'}>
//               <Link to="/login"> Login</Link>
//             </Button>
//           </Stack>
//         )}
//       </Flex>
// {/*
//       <Collapse in={isOpen} animateOpacity>
//         <MobileNav />
//       </Collapse> */}
//     </Box>
//   );
// }

// const MobileNav = () => {
//   return (
//     <Stack
//       bg={useColorModeValue('white', 'gray.800')}
//       p={4}
//       display={{ md: 'none' }}
//     ></Stack>
//   );
// };
'use client';

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/Auth';
import UpdateForm from './UpdateForm';
import UploadForm from './UploadForm';

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default function NavBar() {
  const { isOpen: isP, onClose: oc, onOpen: op } = useDisclosure();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { user: getUser, logoutUser } = useContext(AuthContext);
  const [user, setCurrentUser] = useState(getUser);
  const { colorMode, toggleColorMode } = useColorMode();
  const handleLogout = () => {
    const logout = logoutUser();
    if (logout) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    const user = getUser;
    if (user) {
      setCurrentUser(user);
    }
  }, [getUser]);

  const handleRoleAdmin = () => {
    // if role is admin, return true else return false
    const lowercaseRoles = user
      ? user.roles?.map((role) => role.toLowerCase())
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
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <span
              style={{
                cursor: 'pointer',
                position: 'absolute',
                left: '10%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'black',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 'bold',
              }}
            >
              <Link to="/">Home</Link>
            </span>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'lg'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <span style={{ fontWeight: 'bold' }}>
                      {user ? user.name : ''}
                    </span>
                  </Center>
                  <br />
                  <MenuDivider />
                  {handleRoleAdmin() && (
                    <Menu m={'0'} p={'0 10'} direction={'column'}>
                      <MenuItem>
                        <UpdateForm/>
                      </MenuItem>
                      <MenuItem onClick={op} m={'0'} p={'0 10'}>
                        <div>Upload File</div>
                        <UploadForm isOpen_1={isP} onClose_1={oc} />
                      </MenuItem>

                      <MenuItem
                        onClick={onOpen}
                        m={'0'}
                        p={'0 10'}
                        fontWeight={'bold'}
                      >
                        {/* <Link to={`/update/${user.id}`}> */}
                        Update Profile
                        {/* </Link> */}
                        <UpdateForm
                          isOpen={isOpen}
                          onClose={onClose}
                          user={user}
                        />
                      </MenuItem>
                    </Menu>
                  )}
                  {/* {user ? (
                    
                    <MenuItem
                      onClick={handleLogout}
                      m={'0'}
                      p={'0 10'}
                      fontWeight={'bold'}
                    >
                      Logout
                    </MenuItem>
                  ) : ( 
                    <MenuItem
                      onClick={onOpen}
                      m={'0'}
                      p={'0 10'}
                      fontWeight={'bold'}
                      >
                      <Link to="/login"> Login</Link>
                      
                    </MenuItem>
                  )} */}

                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
