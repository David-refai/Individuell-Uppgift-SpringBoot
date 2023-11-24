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
//   const { currentUser: getUser, logoutUser } = useContext(AuthContext);
//   const [currentUser, setCurrentUser] = useState(getUser);

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
//     const lowercaseRoles = currentUser
//       ? currentUser.roles?.map((role) => role.toLowerCase())
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
//         {currentUser ? (
//           <HStack
//             flex={{ base: 1, md: 0 }}
//             justify={'flex-end'}
//             direction={'row'}
//             spacing={6}
//           >
//             <span
//               style={{
//                 color: 'black',
//         