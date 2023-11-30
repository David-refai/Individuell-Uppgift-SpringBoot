/* eslint-disable react/no-unescaped-entities */
'use client';

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../components/Auth';
// import { useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

export function ModalRegisterForm({ user:currentUser}) {
  const { onOpen } = useDisclosure();
  const { registerUser, error, isLoading } = useContext(AuthContext);
  const finalRef = useRef(null);
  const navigate = useNavigate();
  const [errorLocal, setErrorLocal] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(() => {

    if (onOpen) {
      return true;
    } else {
      return false;
    }
  });

  const handleClose = () => {
    if (currentUser) {
      setIsOpenModal(false);
      navigate('/');
    }
  };

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const res = await registerUser(user);

    if (res) {
      setIsOpenModal(false);
      navigate('/login');
    }

  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorLocal('');
    }, 1500);
    return () => {
      clearTimeout(timer);
    }
    
  }
  , [ isLoading,errorLocal, error, setErrorLocal]);

  return (
    <>
      <div>
        <Modal
          isOpen={isOpenModal}
          onClose={handleClose}
          finalFocusRef={finalRef}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing={8} w={'full'} py={0} px={0}>
                  <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                  {error && (
                    <Text
                      color={'red.500'}
                      fontSize={'lg'}
                      fontWeight={600}
                      textAlign={'center'}
                      // p={2}
                      shadow={'base'}
                    >
                      {errorLocal}
                    </Text>
                  )}
                  <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    // boxShadow={'lg'}
                    p={8}
                  >
                    <Stack spacing={4}>
                      <FormControl id="name">
                        <FormLabel>Email address</FormLabel>
                        <Input
                          type="name"
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
                          autoComplete="email"
                          required
                        />
                      </FormControl>
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          onChange={handleChange}
                          name="password"
                          autoComplete="current-password"
                          required
                        />
                      </FormControl>
                      <Stack spacing={10}>
                        <Button
                          bg={'blue.400'}
                          color={'white'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                          isLoading={isLoading}
                          loadingText="Loading"
                          variant="outline"
                          spinnerPlacement="end"
                          type="submit"
                        >
                          Sign in
                        </Button>

                        <div>
                          <Text>
                            Already have an account?{' '}
                            <Link
                              style={{ color: '#3182ce', fontWeight: 'bold' }}
                              to="/login"
                            >
                              Login
                            </Link>
                          </Text>
                        </div>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </form>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
