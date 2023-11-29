'use client';

import {
  Box,
  FormControl,
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
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/Auth';
import { useNavigate } from 'react-router-dom';
import SuccessContainer from '../components/SuccessContainer';

export default function UpdateForm() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const firstField = React.useRef(); // for focus on first field

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const [success, setSuccess] = useState(false);

  const { updateUser, user:currentUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  let role = '';
  if (currentUser?.roles) {
    role = currentUser.roles[0] === 'ROLE_ADMIN' ? 'ADMIN' : 'USER';
    role = currentUser.roles[0] === 'ROLE_MANAGER' ? 'MANAGER' : role;
  } else {
    role = 'USER';
  }
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    roles: [role],
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      await updateUser(user);
      if (!isLoading) {
        
        onClose();
      }
      navigate('/');
    } catch (error) {
      setError(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    setUser({
      ...user,
      roles: [e.target.value],
    });
  };


  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(errorTimeout);
    }
    if (isLoading) {
      const LoadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(LoadingTimeout);
    }
  }, [error, isLoading]);

  return (
    <form onSubmit={handleSubmit}>
      {isLoading && <SuccessContainer message={'Loading...'} />}
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          shadow={'base'}
          bg={'pink.400'}
          _hover={{
            bg: 'black.300',
          }}
          colorScheme="teal"
          variant="outline"
          spinnerPlacement="end"
          onClick={onOpen}
        >
          Update user
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          //   initialFocusRef={firstField}
          onClose={onClose}
          size={'lg'}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Update user</DrawerHeader>
            {error && (
              <p
                style={{
                  color: '#ff3439',
                  fontSize: '1rem',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  onChange: 'handleErrors',
                }}
              >
                {error}
                <br />
              </p>
            )}
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    // ref={firstField}
                    id="name"
                    placeholder="Please enter user name"
                    value={user.name}
                    type="text"
                    name="name"
                    onChange={handleChange}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    ref={firstField}
                    id="email"
                    placeholder="Please enter user email"
                    value={user.email}
                    type="email"
                    name="email"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    ref={firstField}
                    id="password"
                    placeholder="password"
                    value={user.password}
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <FormControl id="role">
                    <FormLabel>Role</FormLabel>
                    <Select
                      placeholder="Select role"
                      onChange={handleRoleChange}
                      name="role"
                      value={user?.roles[0]}
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="USER">User</option>
                      <option value="MANAGER">Manager</option>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="end"
                              onClick={handleSubmit}
                              type='submit'
              >
                Update
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Stack>
    </form>
  );
}
