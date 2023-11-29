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

export function ModalLoginForm({ user: currentUser }) {
  const { onOpen, onClose } = useDisclosure();
  const { loginUser, isLoading, error: er } = useContext(AuthContext);
  const finalRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);
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
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loginUser(user);
    setIsLoadingLocal(true);
    if (!isLoadingLocal) {
      if (res) {
        setIsOpenModal(false);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
      setIsLoadingLocal(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, er, setError, setIsLoadingLocal, navigate, isLoadingLocal]);

  return (
    <>
      <div>
        <Modal
          isOpen={isOpenModal}
          onClose={handleClose}
          finalFocusRef={finalRef}
        >
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing={8} w={'full'} py={0} px={0}>
                  <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                  {error && (
                    <Text
                      color={'red.300'}
                      fontSize={'lg'}
                      fontWeight={600}
                      textAlign={'center'}
                      p={2}
                      shadow={'base'}
                    >
                      {error}
                    </Text>
                  )}
                  <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    // boxShadow={'lg'}
                    p={8}
                  >
                    <Stack spacing={4}>
                      <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                          type="email"
                          onChange={handleChange}
                          name="email"
                          autoFocus
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
                          colorScheme="blue"
                          isLoading={isLoadingLocal}
                          loadingText="Loading"
                          variant="outline"
                          spinnerPlacement="end"
                          type="submit"
                        >
                          Sign in
                        </Button>

                        <div>
                          <Text>
                            Don't have an account?
                            <Link
                              style={{ color: '#3182ce', fontWeight: 'bold' }}
                              to="/register"
                            >
                              Register
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
