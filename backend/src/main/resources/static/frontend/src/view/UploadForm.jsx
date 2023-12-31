'use client';

import {
  Box,
  Stack,
  Button,
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
import FilesTable from './FilesTable';
import { useContext } from 'react';
import { AuthContext } from '../components/Auth';

export default function UploadForm() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const firstField = React.useRef();
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onOpen();
      }}
    >
      <Stack spacing={8} mx={'auto'} py={24} px={6} w="100%">

        
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          maxW={'sm'}
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

        <FilesTable user={user} />

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
                  <UploadFile onclose={onClose} />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px"></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Stack>
    </form>
  );
}
