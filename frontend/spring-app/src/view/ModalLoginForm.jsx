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
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../components/Auth';
// import { useNavigate } from 'react-router-dom';
import SpinnerShow from '../components/SpinnerShow';
import { Link, useNavigate } from 'react-router-dom';

export function ModalLoginForm() {
  const { onOpen, onClose } = useDisclosure();
  const { loginUser , isLoading } = useContext(AuthContext);
  const finalRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(() => {
    if (onOpen) {
      return true;
    } else {
      return false;
    }
  });

  const handleClose = () => {
    setIsOpenModal(false);
    navigate('/');
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
    try {
      const res = await loginUser(user);

      if (res) {
        setIsOpenModal(false);
        console.log(res);
        navigate('/profile/' + res.id);
      }

      if (res.error) {
        setError(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };


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
                {/* <Flex */}

                <Stack spacing={8} w={'full'} py={0} px={0}>
                  <Heading fontSize={'4xl'}>Sign in to your account</Heading>

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
                        />
                      </FormControl>
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          onChange={handleChange}
                          name="password"
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <Stack spacing={10}>
                        <Button
                          bg={'blue.400'}
                          color={'white'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                          type="submit"
                        >
                          Sign in
                        </Button>

                        {/* <AuthContext.Consumer>
                          {(context) => (
                            <Button
                              bg={'blue.400'}
                              color={'white'}
                              _hover={{
                                bg: 'blue.500',
                              }}
                              onClick={context.loginWithGoogle}
                            >
                              Sign in with Google
                            </Button>
                          )}
                        </AuthContext.Consumer> */}
                        <div>
                          <Text>
                            Don't have an account?{' '}
                            <Link to="/register">Register</Link>
                          </Text>
                        </div>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
                {/* </Flex> */}
              </form>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
