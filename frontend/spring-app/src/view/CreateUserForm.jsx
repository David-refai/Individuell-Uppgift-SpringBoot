'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Select,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/Auth';
import SuccessContainer from '../components/SuccessContainer';

export default function CreateUserForm() {
  const { registerUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    roles: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(user);
      if (res) {
        setLoading(true);
        console.log(res);
        history.push('/profile/' + res.id);
      }
    } catch (error) {
      if (error) {
        setError(error.response?.data.message);
      }
    }
  };

  const handleRoleChange = (e) => {
    setUser({
      ...user,
      roles: [e.target.value],
    });
  };

  const handleErrors = () => {
    const time = setTimeout(() => {
      setError('');
      clearTimeout(time);
    }, 3000);
  };


  useEffect(() => {
    if (error) {
      handleErrors();
    }


    if (loading) {
      const LoadingTimeout = setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
      return () => clearTimeout(LoadingTimeout);
    }
  }, [error, loading]);

  console.log(success);
  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={'100vh'}
        w={'full'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} w={'full'} maxW={'md'}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Add User</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            {loading && (
              <SuccessContainer message="User created successfully" />
            )}

            <Stack spacing={4}>
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
              {loading && <SuccessContainer message={'Loading...'} />}
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  required
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  required
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  required
                />
              </FormControl>
              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Select role"
                  onChange={handleRoleChange}
                  name="roles"
                  required
                >
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                  <option value="MANAGER">Manager</option>
                </Select>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                ></Stack>
                <Button
                  isLoading={loading}
                  loadingText="Loading"
                  colorScheme="teal"
                  variant="outline"
                  spinnerPlacement="end"
                  // onClick={handleSubmit}
                  type="submit"
                  disabled={loading}
                >
                  Update
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
