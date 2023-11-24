'use client';

import {
  Box,
  FormLabel,
  Input,
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

        <FilesTable />

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
