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
import React, { useEffect, useState } from 'react';

import UploadFile from '../components/UploadFile';

export default function UploadForm() {
    const { isOpen, onClose, onOpen} = useDisclosure();
  const firstField = React.useRef();
  const [error, setError] = useState('');

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
  }, [error]);

  return (
    <form>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={24} px={6}>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          shadow={'base'}
          bg={'pink.400'}
          colorScheme="teal"
          onClick={onOpen}
        >
          Upload file
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
          size={'lg'}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Upload file</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="name"
                    placeholder="Please enter file name"
                    value={name}
                    type="text"
                  />
                </Box>

                <Box>
                  <UploadFile />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Upload
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Stack>
    </form>
  );
}
